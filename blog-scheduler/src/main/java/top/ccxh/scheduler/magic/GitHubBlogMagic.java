package top.ccxh.scheduler.magic;

import com.alibaba.fastjson.JSON;
import javafx.beans.binding.ObjectExpression;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import top.ccxh.common.utils.DateUtil;
import top.ccxh.scheduler.magic.config.MyDownloader;
import top.ccxh.xmapper.dto.Blog;
import us.codecraft.webmagic.*;
import us.codecraft.webmagic.pipeline.ConsolePipeline;
import us.codecraft.webmagic.processor.PageProcessor;
import us.codecraft.webmagic.selector.Selectable;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;

/**
 * github爬虫
 * @author honey
 */
public class GitHubBlogMagic implements PageProcessor {
    private Logger log = LoggerFactory.getLogger(getClass());
    private Site site = Site.me().setRetryTimes(3).setSleepTime(100);
    private static String GITHUB_URL = "https://github.com/";
    private final static DateTimeFormatter GITHUB_DATE_TIME_FORMAT=DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssz");
    private SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssXXX");
    @Override
    public void process(Page page) {
        Request request = page.getRequest();
        String url = request.getUrl();
        String urldecoder = null;
        try {
            urldecoder = URLDecoder.decode(request.getUrl(), "utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        if (urldecoder != null && !urldecoder.matches(".*\\.md$")) {
            //获取github中的table
            Selectable table = page.getHtml().$(".file-wrap .files.js-navigation-container.js-active-navigation-container");
            //删除末尾为四十长度的切不包含%的连接
            Selectable link = table.$(".content a").links();
            if (!link.match()) {
                return;
            }
            page.addTargetRequests(link.all());

        } else {
            //处理时间,并发送到保存
            if (request.getExtra("blog")!=null){
                Blog blog = (Blog)request.getExtra("blog");
                String timestr = page.getHtml().$("relative-time").xpath("//*/@datetime").get();
                try {
                    simpleDateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
                    Date parse = simpleDateFormat.parse(timestr);
                    blog.setGithubTime(parse);
                    page.putField("blog", blog);
                    return;
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                page.putField("blog", blog);
                return;
            }
            Selectable markdown = page.getHtml().$(".markdown-body.entry-content");
            if (markdown.match()) {
                Selectable blogMessagePre = markdown.$("pre[lang='blog']");
                if (null != blogMessagePre && !"".equals(blogMessagePre)) {
                    String code = blogMessagePre.$("code").replace("\n", "").regex("\\{.*\\}").toString();
                    if (!"".equals(code) && null != code) {
                        Blog blog = JSON.parseObject(code, Blog.class);
                        blog.setUrl(url);
                        String substring = url.substring(GITHUB_URL.length());
                        blog.setGithubName(substring.split("/")[0]);
                        Selectable datetime = page.getHtml().$("relative-time", "datetime");
                        if (datetime.match()){
                            blog.setGithubTime(DateUtil.localDateTimeToUdate(LocalDateTime.parse(datetime.get(),GITHUB_DATE_TIME_FORMAT)));
                        }
                        String timePath = page.getHtml().$(".commit-tease").xpath("//*/@src").get();
                        String timeUrl = url.substring(0, request.getUrl().indexOf("com") + 3).concat(timePath);
                        //重新发起请求获取githubTime
                        page.addTargetRequest(getBlogTimeRequest(timeUrl,blog));
                    }
                }
            }
            page.setSkip(true);
        }
    }

    @Override
    public Site getSite() {
        return site;
    }
    private Request getBlogTimeRequest(String timeUrl,Object object){
        Map<String,Object> map=new HashMap<>();
        map.put("blog",object);
        Request timeReq=new Request(timeUrl);
        timeReq.setExtras(map);
        return timeReq;
    }
   public static void main(String[] args) {
        Spider spider = Spider.create(new GitHubBlogMagic());
        spider.setDownloader(new MyDownloader());
        spider.addUrl("https://github.com/sunjiaqing/note/blob/master/Docker.md").addPipeline(new ConsolePipeline()).thread(1).run();

    }
}

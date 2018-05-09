package top.ccxh.scheduler.magic.action;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import top.ccxh.common.service.HttpClientService;
import top.ccxh.common.utils.DateUtil;
import top.ccxh.scheduler.magic.GitHubBlogMagic;
import top.ccxh.scheduler.magic.MagicUrl;
import top.ccxh.scheduler.magic.config.MyDownloader;
import top.ccxh.xmapper.mapper.BlogMapper;
import top.ccxh.xmapper.mapper.GithubUserMapper;
import top.ccxh.xmapper.dto.Blog;
import top.ccxh.xmapper.dto.GithubUser;
import us.codecraft.webmagic.Spider;


import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

/**
 * 抓取github的定时任务
 * @author honey
 */
@SuppressWarnings("SpringJavaAutowiringInspection")
@Component
public class GitGubBlogsAction {
    private static final Logger log = LoggerFactory.getLogger(GitGubBlogsAction.class);
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private GithubUserMapper githubUserMapper;
    @Autowired
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    private BlogMapper blogMapper;
    @Scheduled(cron = "0 55/55 * * * ?")
    public void reportCurrentTime() {
        LocalDateTime time=LocalDateTime.now();
        long start = System.currentTimeMillis();
        List<GithubUser> githubUsers = githubUserMapper.selectAll();
        Spider spider = Spider.create(new GitHubBlogMagic());
        for (GithubUser user:githubUsers){
            spider.addUrl(String.format(MagicUrl.GITHUB_URL,user.getGithubName(),user.getGithubRepository()));
        }
        spider.setDownloader(new MyDownloader());
        final long[] floor = {0};
        spider.addPipeline((resultItems,task)->{
            Blog blog=resultItems.get("blog");
            if (blog!=null){
                blog.setCreateTime(new Date());
                blogMapper.insert(blog);
            }
        }).thread(11).run();
        long end = System.currentTimeMillis();
        //2:55  1:55
        time=time.minusHours(1);
        Date date = DateUtil.localDateTimeToUdate(time);
        int i = blogMapper.deleteByCrateTime(date);
        log.info("GitGubBlogsAction,name:{},dispose:{},deleteItem:{},RunTime:{}", spider.getClass().getName(), spider.getPageCount(),i,end-start);
    }
}

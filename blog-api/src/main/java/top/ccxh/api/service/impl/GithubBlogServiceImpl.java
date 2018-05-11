package top.ccxh.api.service.impl;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.ccxh.api.service.GithubBlogService;
import top.ccxh.common.service.HttpClientService;
import top.ccxh.common.utils.DateUtil;
import top.ccxh.xmapper.dto.Blog;
import top.ccxh.xmapper.mapper.BlogMapper;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Service
public class GithubBlogServiceImpl implements GithubBlogService {
    @SuppressWarnings({"SpringJavaAutowiringInspection", "SpringJavaInjectionPointsAutowiringInspection"})
    @Autowired
    private BlogMapper blogMapper;
    @Autowired
    HttpClientService httpClientService;
    @Override
    public List<Blog> getBlogs() {
        // 上一个小时的55
        LocalDateTime localDateTime=LocalDateTime.now();
        LocalTime of1 = LocalTime.of(localDateTime.minusHours(1).getHour(), 55);
        //这个小时的55
        LocalTime of = LocalTime.of(localDateTime.getHour(), 55);
        //取上个小时日期否则有跨天问题
        Date min= DateUtil.localTimeToUdate(of1,localDateTime.minusHours(1).toLocalDate());
        Date max= DateUtil.localTimeToUdate(of, localDateTime.toLocalDate());
        return blogMapper.selectByCreateTime(min,max,"sunjiaqing");
    }

    @Override
    public Blog getBlogBodyById(Integer id) {
        Blog blog = new Blog();
        blog.setId(id);
        blog=blogMapper.selectByPrimaryKey(blog);
        if (blog!=null){
            try {
                String html = httpClientService.doGet(blog.getUrl());
                Document document = Jsoup.parse(html);
                return blog.setContent(document.body().select("article").toString());
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }
        return null;
    }
}

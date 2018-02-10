package top.ccxh.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.ccxh.api.service.GithubBlogService;
import top.ccxh.common.utils.DateUtil;
import top.ccxh.xmapper.dto.Blog;
import top.ccxh.xmapper.mapper.BlogMapper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Service
public class GithubBlogServiceImpl implements GithubBlogService {
    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    private BlogMapper blogMapper;
    @Override
    public List<Blog> getBlogs() {
        // 上一个小时的55
        LocalDateTime localDateTime=LocalDateTime.now();
        LocalTime of1 = LocalTime.of(localDateTime.minusHours(1).getHour(), 55);
        //这个小时的55
        LocalTime of = LocalTime.of(localDateTime.getHour(), 55);
        Date min= DateUtil.localTimeToUdate(of1, LocalDate.now());
        Date max= DateUtil.localTimeToUdate(of, LocalDate.now());
        return blogMapper.selectByCreateTime(min,max,"sunjiaqing");
    }
}

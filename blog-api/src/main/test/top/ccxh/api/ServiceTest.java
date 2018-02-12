package top.ccxh.api;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.test.context.junit4.SpringRunner;
import top.ccxh.xmapper.mapper.BlogMapper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@SuppressWarnings("SpringJavaAutowiringInspection")
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlogApiAction.class)
public class ServiceTest {
    @Autowired
    private BlogMapper blogMapper;
    @Test
    public void test(){
        LocalDateTime parse = LocalDateTime.parse("2018-02-11T16:44:30Z", DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssz"));
        System.out.println("parse = " + parse.toString());
    }
}
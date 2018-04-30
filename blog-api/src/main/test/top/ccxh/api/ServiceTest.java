package top.ccxh.api;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.scheduling.support.CronSequenceGenerator;
import org.springframework.test.context.junit4.SpringRunner;
import top.ccxh.common.service.HttpClientService;
import top.ccxh.xmapper.mapper.BlogMapper;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@SuppressWarnings("SpringJavaAutowiringInspection")
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlogApiAction.class)
public class ServiceTest {
    @Autowired
    private HttpClientService httpClientService;
    @Test
    public void test(){
        try {
            String s = httpClientService.doGet("https://github.com/sunjiaqing/note/blob/master/Docker.md", "utf-8");
            System.out.println("s = " + s);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
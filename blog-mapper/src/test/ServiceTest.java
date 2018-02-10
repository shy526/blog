import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import top.ccxh.common.utils.DateUtil;
import top.ccxh.xmapper.BlogMapperAction;
import top.ccxh.xmapper.dto.Blog;
import top.ccxh.xmapper.mapper.BlogMapper;

import java.time.LocalDateTime;
import java.util.List;

@SuppressWarnings("SpringJavaAutowiringInspection")
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlogMapperAction.class)
public class ServiceTest {
    @Autowired
    private BlogMapper blogMapper;
    @Test
    public void test(){
        List<Blog> blogs = blogMapper.selectAll();
        LocalDateTime localDateTime = LocalDateTime.now().minusHours(1000);
        int i = blogMapper.deleteByCrateTime(DateUtil.localDateTimeToUdate(localDateTime));
        System.out.println("i = " + i);
        System.out.println("blogs = " + blogs);
    }
}
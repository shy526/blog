package top.ccxh.scheduler;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import tk.mybatis.spring.annotation.MapperScan;


@SpringBootApplication
@EnableScheduling
@MapperScan("top.ccxh.xmapper.mapper")
public class SchedulerAction {
    public static void main(String[] args) throws Exception {
        SpringApplication.run(SchedulerAction.class);
    }
}

package top.ccxh.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import tk.mybatis.spring.annotation.MapperScan;

@SpringBootApplication
@MapperScan("top.ccxh.xmapper.mapper")
@ComponentScan("top.ccxh.common.service")
@ComponentScan("top.ccxh.api")
public class BlogApiAction {

	public static void main(String[] args) {
		SpringApplication.run(BlogApiAction.class, args);
	}
}

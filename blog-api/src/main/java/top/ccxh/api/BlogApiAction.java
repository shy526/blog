package top.ccxh.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import tk.mybatis.spring.annotation.MapperScan;

@SpringBootApplication
@MapperScan("top.ccxh.xmapper.mapper")
public class BlogApiAction {

	public static void main(String[] args) {
		SpringApplication.run(BlogApiAction.class, args);
	}
}

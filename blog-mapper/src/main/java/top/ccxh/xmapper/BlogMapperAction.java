package top.ccxh.xmapper;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import tk.mybatis.spring.annotation.MapperScan;

@SpringBootApplication
@MapperScan("top.ccxh.xmapper.mapper")
public class BlogMapperAction {

	public static void main(String[] args) {
		SpringApplication.run(BlogMapperAction.class, args);
	}
}

package top.ccxh.api.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.ccxh.api.service.GithubBlogService;
import top.ccxh.common.vo.SysResult;


@RestController
@RequestMapping("github/blog")
public class GithubBlog {
    @Autowired
    private GithubBlogService githubBlogService;
    @RequestMapping("ccxh")
    public SysResult getBlogItem(){

         return SysResult.oK(githubBlogService.getBlogs());
    }
}

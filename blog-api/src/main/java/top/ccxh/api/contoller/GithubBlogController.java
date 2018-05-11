package top.ccxh.api.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.ccxh.api.service.GithubBlogService;
import top.ccxh.common.utils.JsonpUtil;
import top.ccxh.common.vo.SysResult;
import top.ccxh.xmapper.dto.Blog;


@RestController
@RequestMapping("github/blog")
public class GithubBlogController {
    @Autowired
    private GithubBlogService githubBlogService;
    @RequestMapping("ccxh")
    public SysResult getBlogItem(){

         return SysResult.oK(githubBlogService.getBlogs());
    }
    @RequestMapping("call/body")
    public String getMarkdownJsonP(Integer id){
        Blog blog = githubBlogService.getBlogBodyById(id);
        if (blog==null){
            return JsonpUtil.jsonpString(SysResult.build(201,"文章不存在或正在更新"));
        }else {
            return JsonpUtil.jsonpString(SysResult.oK(blog));
        }
    }
}

package top.ccxh.api.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.ccxh.api.service.GithubBlogService;
import top.ccxh.common.utils.JsonpUtil;
import top.ccxh.common.vo.SysResult;


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
        String blogBodyById = githubBlogService.getBlogBodyById(id);
        if (StringUtils.isEmpty(blogBodyById)){
            return JsonpUtil.jsonpString(SysResult.build(201,"文章不存在或正在更新"));
        }else {
            SysResult sysResult = SysResult.oK();
            sysResult.setJson(blogBodyById);
            return JsonpUtil.jsonpString(sysResult);
        }
    }
}

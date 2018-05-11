package top.ccxh.api.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.ccxh.api.service.CountService;
import top.ccxh.common.vo.SysResult;
import top.ccxh.xmapper.dto.Access;

import javax.servlet.http.HttpServletRequest;


@RequestMapping("count")
@RestController
public class CountController {
    @Autowired
    CountService countService;
    @RequestMapping("access")
    public SysResult count (Access access,HttpServletRequest request){
        countService.count(request,access);
        return SysResult.oK();
    }

}

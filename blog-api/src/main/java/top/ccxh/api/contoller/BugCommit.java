package top.ccxh.api.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.ccxh.api.service.BugService;
import top.ccxh.common.vo.SysResult;
import top.ccxh.xmapper.dto.Bug;

@RestController

public class BugCommit {
    @Autowired
    BugService bugService;
    @RequestMapping("/bug")
    public SysResult reBug(Bug bug){
        if (bugService.saveBug(bug)>0){
            return SysResult.oK();
        }
        return SysResult.build(201,"保存失败");

    }
}

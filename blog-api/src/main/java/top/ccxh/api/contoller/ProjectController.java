package top.ccxh.api.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.ccxh.api.service.ProjectService;
import top.ccxh.common.vo.SysResult;
import top.ccxh.xmapper.dto.ProjectDto;

import java.util.List;

@RestController
@RequestMapping("project")
public class ProjectController {
    @Autowired
    ProjectService projectService;
    @RequestMapping("all")
    public SysResult projectAll(){
        List<ProjectDto> projs=projectService.findAll();
        return SysResult.oK(projs);
    }
}

package top.ccxh.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.ccxh.api.service.ProjectService;
import top.ccxh.xmapper.dto.ProjectDto;
import top.ccxh.xmapper.mapper.ProjectMapper;

import java.util.List;
@Service
public class ProjectServiceImpl implements ProjectService {
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    ProjectMapper projectMapper;

    @Override
    public List<ProjectDto> findAll() {
        return projectMapper.selectAll();
    }
}

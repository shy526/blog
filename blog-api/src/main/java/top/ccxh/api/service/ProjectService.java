package top.ccxh.api.service;

import top.ccxh.xmapper.dto.ProjectDto;

import java.util.List;

public interface ProjectService {
    List<ProjectDto> findAll();
}

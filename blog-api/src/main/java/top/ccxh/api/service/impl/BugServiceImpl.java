package top.ccxh.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.ccxh.api.service.BugService;
import top.ccxh.xmapper.dto.Bug;
import top.ccxh.xmapper.mapper.BugMapper;

import java.util.Date;

@Service
public class BugServiceImpl implements BugService {
    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    BugMapper bugMapper;
    @Override
    public int saveBug(Bug bug) {
        bug.setCreateTime(new Date());
        return bugMapper.insert(bug);
    }
}

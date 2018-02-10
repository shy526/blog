package top.ccxh.xmapper.mapper;


import org.apache.ibatis.annotations.Param;
import top.ccxh.common.mapper.SysMapper;
import top.ccxh.xmapper.dto.Blog;

import java.util.Date;
import java.util.List;

public interface BlogMapper extends SysMapper<Blog> {
    /**
     * 根据时间删除条目
     * @param time
     * @return
     */
    int deleteByCrateTime(Date time);
    /**
     * 根据 创建时间 获取 min-max之间的及记录
     * @param min
     * @param max
     * @param githubName
     * @return
     */
    List<Blog> selectByCreateTime(@Param("min") Date min, @Param("max") Date max, @Param("name") String githubName);
}

package top.ccxh.api.service;

import top.ccxh.xmapper.dto.Access;

import javax.servlet.http.HttpServletRequest;

/**
 * @author honey
 */

public interface CountService {
     void count(HttpServletRequest request, Access access);
}

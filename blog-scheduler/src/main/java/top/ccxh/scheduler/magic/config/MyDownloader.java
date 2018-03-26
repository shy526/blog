package top.ccxh.scheduler.magic.config;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Request;
import us.codecraft.webmagic.Task;
import us.codecraft.webmagic.downloader.HttpClientDownloader;
import us.codecraft.webmagic.downloader.HttpClientRequestContext;
import us.codecraft.webmagic.downloader.HttpUriRequestConverter;
import us.codecraft.webmagic.proxy.Proxy;
import us.codecraft.webmagic.proxy.ProxyProvider;

import java.io.IOException;

/**
 * webmagic 渲染模块
 * @author honey
 */
public class MyDownloader extends HttpClientDownloader {
    private Logger loggerr=LoggerFactory.getLogger(this.getClass());
    private HttpUriRequestConverter httpUriRequestConverter = new HttpUriRequestConverter();
    private ProxyProvider proxyProvider;
    @Override
    public Page download(Request request, Task task) {
        if (task != null && task.getSite() != null) {
            Proxy proxy = this.proxyProvider != null ? this.proxyProvider.getProxy(task) : null;
            HttpClientRequestContext requestContext = this.httpUriRequestConverter.convert(request, task.getSite(), proxy);
            Page page = Page.fail();
            CloseableHttpResponse httpResponse=null;
            try {
                httpResponse = MyHttpClient.client.getInstance().execute(requestContext.getHttpUriRequest(), requestContext.getHttpClientContext());
                page = this.handleResponse(request, request.getCharset() != null ? request.getCharset() : task.getSite().getCharset(), httpResponse, task);

                if (page != null) {
                    return page;
                }else {
                    loggerr.info("无法获取网页");
                    throw new IOException("无法获取网页");
                }

            } catch (IOException e) {
                e.printStackTrace();
            }finally {
                if (httpResponse != null) {
                    EntityUtils.consumeQuietly(httpResponse.getEntity());
                }
            }

        }
       return null;
    }

}

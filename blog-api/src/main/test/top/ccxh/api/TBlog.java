package top.ccxh.api;

import java.io.Serializable;
import java.util.Date;

public class TBlog implements Serializable {
    private static final long serialVersionUID = 7L;
    /*不能为空*/
    private  Integer id;
    /*默认值: 空,'github名字'*/
    private  String githubName;
    /*默认值: 空,'文章类型'*/
    private  String type;
    /*默认值: 空,'文章标题'*/
    private  String title;
    /*默认值: 空,'文章标签'*/
    private  String tag;
    /*默认值: 空,'条目创建时间'*/
    private  Date createTime;
    /*默认值: 空,'文章连接'*/
    private  String url;
    /*默认值: 空,'github创建时间'*/
    private  Date githubTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public String getGithubname() {
        return githubName;
    }

    public void setGithubname(String githubName) {
        this.githubName = githubName;
    }
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }
    public Date getCreatetime() {
        return createTime;
    }

    public void setCreatetime(Date createTime) {
        this.createTime = createTime;
    }
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
    public Date getGithubtime() {
        return githubTime;
    }

    public void setGithubtime(Date githubTime) {
        this.githubTime = githubTime;
    }


    @Override
    public String toString() {
        return "TBLOG{"+
                "  id="+id+
                ",  githubName="+'\''+githubName+'\''+
                ",  type="+'\''+type+'\''+
                ",  title="+'\''+title+'\''+
                ",  tag="+'\''+tag+'\''+
                ",  createTime="+'\''+createTime+'\''+
                ",  url="+'\''+url+'\''+
                ",  githubTime="+'\''+githubTime+'\''+
                '}';
    }

}
package top.ccxh.xmapper.dto;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

public class ProjectDto implements Serializable {
    private static final long serialVersionUID = 7L;
    /*不能为空,'id'*/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer id;
    /*默认值: 空,'项目名'*/
    private  String projectName;
    /*默认值: 空,'创建时间'*/
    private  Date createTime;
    /*默认值: 空,'项目地址'*/
    private  String projectUrl;
    /*默认值: 空,'标签'*/
    private  String tag;
    /*默认值: 空,'项目标题'*/
    private  String projectTitle;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public String getProjectname() {
        return projectName;
    }

    public void setProjectname(String projectName) {
        this.projectName = projectName;
    }
    public Date getCreatetime() {
        return createTime;
    }

    public void setCreatetime(Date createTime) {
        this.createTime = createTime;
    }
    public String getProjecturl() {
        return projectUrl;
    }

    public void setProjecturl(String projectUrl) {
        this.projectUrl = projectUrl;
    }
    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }
    public String getProjecttitle() {
        return projectTitle;
    }

    public void setProjecttitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }


    @Override
    public String toString() {
        return "Projectdto{"+
                "  id="+id+
                ",  projectName="+'\''+projectName+'\''+
                ",  createTime="+'\''+createTime+'\''+
                ",  projectUrl="+'\''+projectUrl+'\''+
                ",  tag="+'\''+tag+'\''+
                ",  projectTitle="+'\''+projectTitle+'\''+
                '}';
    }

}
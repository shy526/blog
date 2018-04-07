
var mysql2JavaBean={
    /**
     * 部分 mysql 类型-java类型 对照
     */
    mysqlType:{
        VARCHAR: "String",
        CHAR: "String",
        BLOB:"Byte[]",
        INT:"Integer",
        TIME:"Date",
        DATETIME: "Date",
        TIMESTAMP: "Date"
    },
    /**
     * mysql 部分关键词处理
     */
    mysqlKeyWord:{
        DEFAULT: function(word,i){
            i++;
            var comments="默认值: ";
            if (word[i].toUpperCase()=="NULL"){
                comments+="空";
            }else{
                comments=word[i];
            }
            return{
                comments:comments,
                index:i
            }
        },
        COMMENT:function (word,i) {
            var comments=word[++i]
            return{
                comments:comments,
                index:i
            }

        },   NOT:function (word,i) {
            var comments="不能为空"
            return{
                comments:comments,
                index:i
            }

        }
    },
    /**
     * 替换全局`和回车符
     * @param createTable
     * @param option
     * @returns {XML|string}
     */
    init:function(createTable,option){
        if(option){
            for(var key in option){
                mysql2JavaBean.option[key]= option[key]
            }
        }
        return createTable.replace(new RegExp("`",'g'),"").replace(/[\r\n]/g,"");
    },
    /**
     * 抽取主键ID
     * @param createTable
     * @returns {XML|string|void}
     */
    getId:function(createTable) {
        var reg = /PRIMARY KEY \((\w+)\)/;
        var id = createTable.match(reg);
        if (id && id.length >= 2) {
            return id[1].replace(/\_/g,"");
        } else {
            return;
        }
    },
    /**
     * 核心处理逻辑
     * @param createTable
     * @param option
     * @returns {*|string}
     */
    dispose:function(createTable,option){
        createTable=mysql2JavaBean.init(createTable,option);
        var tableName=mysql2JavaBean.getTableName(createTable);
        mysql2JavaBean.option.id=mysql2JavaBean.getId(createTable);
        mysql2JavaBean.option.tableName=tableName;
        var words=mysql2JavaBean.getWordList(createTable);
        var attrs= new Array();
        //抽取属性类型等
        for(var i=0;i<words.length;i++){
            if(!words[i]||words[i].length<=1){
                continue;
            }
            //说明结束了
            if("PRIMARY"==words[i].toUpperCase()){
                break;
            }
            var temp = mysql2JavaBean.attrParse(words,i);
            if(temp.index==-1){
                break;
            }
            i=temp.index;
            attrs.push(temp)
        }
        if(!  mysql2JavaBean.option.classname){
            mysql2JavaBean.option.classname=tableName;
        }
        return mysql2JavaBean.assemblebean(attrs);

    },
    /**
     * 抽取表名
     * @param createTable
     * @returns {*}
     */
    getTableName:function(createTable){
        var reg=/CREATE TABLE (\w+)\s*\(/i;
        var tableName=createTable.match(reg);
        if(tableName&&tableName.length>=2){
            return tableName[1];
        }else {
            return ;
        }
    },
    /**
     * sql 转换为单词
     * @param createTable
     * @returns {Array}
     */
    getWordList:function(createTable){
        reg=/\(.*\)/
        var attr=createTable.match(reg)
        if(attr&&attr.length>=1){
            //空格将列表打成单词数组
            reg=/\s+/;
            //console.log(attr[0]);
            return attr[0].split(reg)
        }else {
            return ;
        }
    },
    /**
     * 解析一个属性
     * @param words
     * @param i
     * @returns {{index: *, typeName: *, attrName: *, comments: string}}
     */
    attrParse:function (words,i) {
        //获取属性
        var attrName=words[i];
        var typeName=words[++i];
        if(!typeName){
           return {
               index: -1,
           }
        }
        var type =null
        type=typeName.match(/(\w+)\(.+\)/);

        if(type){
            typeName=type[1];
        }else {
            type=typeName;
        }
        //转化为javatype
        typeName= mysql2JavaBean.mysqlType[typeName.toUpperCase()];
        //检测最后一个,号所在的位置
        var comments="";
        while (true){
            i++;
            if(i>=words.length){
                break;
            }
            var function1 = mysql2JavaBean.mysqlKeyWord[words[i].trim().toUpperCase()];
            if (function1){
                var mysqlKeyWord2 = function1(words,i);
                comments+=mysqlKeyWord2.comments+",";
            }
            var s = words[i].charAt(words[i].length-1).trim();
            if(s==","){
                break;
            }
        }
        //消除末尾的,号
        while (comments&&comments.charAt(comments.length-1)==","){
            comments=comments.substring(0,comments.length-1)
        }
        //转换规则
        //Pasika,camel,UP,low
        if(mysql2JavaBean.option.nameRule=="camel"){
            attrName=mysql2JavaBean.nameRulef(attrName,false);
        }else if (mysql2JavaBean.option.nameRule=="Pasika"){
            attrName=mysql2JavaBean.nameRulef(attrName,true);
        }else if (mysql2JavaBean.option.nameRule=="UP"){
            //console.log(attrName.replace(/\_/g,""))
            //.replace(/[\r\n]/g,"");
        attrName=attrName.replace(/\_/g,"").toUpperCase();
        }else if (mysql2JavaBean.option.nameRule=="low") {
            attrName=attrName.replace(/\_/g,"").toLowerCase();
        }
        return {
            index:i,
            typeName:typeName,
            attrName:attrName,
            comments:comments
        };
    },
    /**
     * 默认设置
     */
    option:{
        //Pasika,camel,up,low
        nameRule: 'camel',
        comments: true,
        getset:true,
        toStrong:true,
        classname: null,
        annotation:null,
        tableName:null,
        id:null,
    },
    /**
     * 转换帕斯卡,驼峰转换类
     * @param str
     * @param t1
     * @returns {string}
     */
    nameRulef:function (str,t1) {
        var array = str.split("_");
        var stt=""
        for (var i=0;i<array.length;i++){
            var t = array[i].charAt(0);
            var d = array[i].substring(1,array[i].length).toLowerCase();
            if(t1){
               stt+= t.toUpperCase()+d;

            }else{
                stt+=  t.toLowerCase()+d;
                t1=true; //首次小写 之后转化为首字母大写
            }
        }
        return stt;
    },
    /**
     * 组装一个java类
     * @param attrs
     * @returns {string}
     */
    assemblebean:function (attrs) {
        var clssName= mysql2JavaBean.nameRulef(mysql2JavaBean.option.classname,true);
        //拼接java 头
        var javaTitle="public class "+clssName+" implements Serializable {\n" +
            "    private static final long serialVersionUID = 7L;\n";
        //拼接属性;
        var javaAttr="";
        var javaGetSet="";
        var javaToString="\n    @Override\n" +
                        "    public String toString() {\n" +
                        "       return \""+clssName+"{\"+"+"\n";
        var tosting2=""
        for (var i=0;i<attrs.length;i++){
            if(mysql2JavaBean.option.comments){
                javaAttr+="     /*"+attrs[i].comments+"*/\n"
            }
            if(mysql2JavaBean.option.annotation){
                if(mysql2JavaBean.option.id&&attrs[i].attrName.toUpperCase()==mysql2JavaBean.option.id.toUpperCase()){
                    javaAttr+="    @Id\n" +
                        "    @GeneratedValue(strategy = GenerationType.IDENTITY)\n"
                }
            }
            javaAttr+="    private "+" "+attrs[i].typeName+" "+ attrs[i].attrName+";\n";
            //生成getset方法
                javaGetSet+=mysql2JavaBean.crateGetSet(attrs[i])
            //tostring
            tosting2+=mysql2JavaBean.javaToString(attrs[i])
        }

        tosting2="                  \""+tosting2.substring(tosting2.indexOf(",")+1,tosting2.length);
        javaToString+=tosting2+"             '}';\n" +
            "    }"+"\n";
        var result=javaTitle+javaAttr+"\n";
            if(mysql2JavaBean.option.getset){
                result+=javaGetSet+"\n";
            }
            if (mysql2JavaBean.option.toStrong){
                result+=javaToString+"\n";
            }
        if (mysql2JavaBean.option.annotation){

                result="@Table(name = \""+mysql2JavaBean.option.tableName+"\") \n"+result;
            if(mysql2JavaBean.option.annotation=="jpa"){
                result="@Entity\n" +result;
            }

        }
        return result+"}";
    },
    /**
     * 生成 get set方法
     * @param attr
     * @returns {string}
     */
    crateGetSet:function (attr) {
        var t = attr.attrName.charAt(0).toUpperCase();
        var d = attr.attrName.substring(1,attr.attrName.length).toLowerCase();
        methodName=t+d;
        var get="    public "+attr.typeName+" get"+methodName+"() {\n" +
            "        return "+attr.attrName+";\n" +
            "    }\n" +
            "\n" ;
        var set="    public void set"+methodName+"("+attr.typeName+" "+attr.attrName+") {\n" +
            "        this."+attr.attrName+" = "+attr.attrName+";\n" +
            "    }\n "
        return  get+set;
    },
    /**
     * 生成java toString 方法
     * @param attr
     * @returns {string}
     */
    javaToString:function (attr) {
        if(attr.typeName=="Integer") {
            return "                 \",  "+attr.attrName+"=\""+"+"+attr.attrName+"+"+"\n"
        }else{
            return  "                 \",  "+attr.attrName+"=\""+"+\'\\\'\'+"+attr.attrName+"+\'\\\'\'+"+"\n"
        }
    }
}

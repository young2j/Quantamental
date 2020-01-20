export default {
    START_REQUEST:"START_REQUEST",
    END_REQUEST:"END_REQUEST",

    HORIZONTAL: 'HORIZONTAL', //横向分析or纵向分析
    SEARCH_FIRM:'SEARCH_FIRM', //搜索需要查看的公司
    ADD_FIRM:'ADD_FIRM', //添加可比公司
    DELETE_FIRM:'DELETE_FIRM', //删除可比公司

    ADD_DATE:'ADD_TIME', //添加一年的数据
    DELETE_DATE:'DELETE_DATE',//删除一年的数据
    SELECT_DATE:'SELECT_DATE',//选择当前时间维度

    FOLLOW_FIRM:'FOLLOW_FIRM', //关注公司
    
    SELECT_FIRM:"SELECT_FIRM", //选中一家公司
    CHANGE_RANGE:'CHANGE_RANGE', //改变时间范围
    //========================================
    GET_EVA:'GET_EVA',//获得估值信息

    //========================================
    GET_QUA:'GET_QUA', //获得质量信息
    
    //====================
    MERGE_FACTORS:'MERGE_FACTORS', //合并选择的因子信息
    ADD_COLUMNS:'ADD_COLUMNS', //新增表（大类因子）
    DELETE_COLUMNS:'DELETE_COLUMNS' //删除表
}
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
    SELECT_SAMPLE_PERIOD:'SELECT_SAMPLE_PERIOD', //选择样本期间
    DELETE_MYPORTFOLIO:'DELETE_MYPORTFOLIO',//删除我的组合
    DELETE_MYFOLLOWS:'DELETE_MYFOLLOWS',//删除我的组合

    SAVE_UNIVERSE:'SAVE_UNIVERSE',//保存股票池，step2.3显示综合得分用，实际后端做好，就不需要这个
    MERGE_FACTORS:'MERGE_FACTORS', //合并选择的因子信息
    ADD_COLUMNS:'ADD_COLUMNS', //新增表（大类因子）
    DELETE_COLUMNS:'DELETE_COLUMNS', //删除表

    COMPUTE_CORR:'COMPUTE_CORR', //冗余因子剔除--提供数据用于计算相关系数矩阵
    COMPUTE_SCORE:'COMPUTE_SCORE', //提供数据用于计算因子综合得分

    SAVE_MYPORTFOLIO:"SAVE_MYPORTFOLIO" //保存组合
}
var ACCOUNTID = process.env.ACCOUNTID;
var SNSTOPIC = process.env.SNSTOPIC;
var AWS = require("aws-sdk");

function numberWithCommas(n) {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

exports.handler = function(event, context) {
    let responseBody = {
        message: `${event}`,
        input: event
    };
    let response = {
        statusCode: 200,
        body: JSON.stringify(responseBody)
    };

    let msg = "";
    msg += "작성일 : " + event.date +"\n";
    msg += "작성자 : " + event.author +"\n";
    msg += "프로젝트정보 : " + event.project + "\n";
    msg += "예상시작일 : " + event.startdate + "\n";
    msg += "예상마감일 : " + event.enddate + "\n";
    msg += "이메일 : " + event.email + "\n";
    msg += "코맨트 : " + event.comment + "\n";
    msg += "총견적 : " + event.unit + numberWithCommas(event.total) + "\n\n";
    msg += "세부항목 : 총" + event.items.length + "건\n";
    msg += "\n";
	let unit = event.unit;
    
    for (let i = 0; i < event.items.length; i++) {
        let line = "----------\n";
        line += "견적 : " + unit + numberWithCommas(event.items[i].total) + ", ";
        line += "총샷수 : " + event.items[i].totalShotNum + ", ";
        line += "총프레임 : " + event.items[i].frame + "\n";
        let attr = [];
        for (let a = 0; a < event.items[i].attributes.length; a++) {
            attr.push(event.items[i].attributes[a].id);
        }
        line += "속성 : " + attr.join(",") + "\n";
        line += "objectTrackingRigid : " + event.items[i].objectTrackingRigid + "샷, ";
        line += "objectTrackingNoneRigid : " + event.items[i].objectTrackingNoneRigid + "샷, ";
        line += "rotoanimationBasic : " + event.items[i].rotoanimationBasic + "샷, ";
        line += "rotoanimationSoftDeform : " + event.items[i].rotoanimationSoftDeform + "샷, ";
        line += "layout : " + event.items[i].layout + "샷, ";
        msg += line;
        msg += "\n";
    }
    

    var params = {
        Message: msg,
        Subject: `Estimate Notification - Send : ` + event.date,
        TopicArn: `arn:aws:sns:ap-northeast-2:${ACCOUNTID}:${SNSTOPIC}`
    };
    var sns = new AWS.SNS();
    sns.publish(params, context.done);
    return response;
};

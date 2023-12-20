var IDACom;
if (!IDACom) {
    console.log("no IDACom")
    IDACom = createIDACom();
}

function createIDACom() {
    ocx = document.createElement("object");
    ocx.setAttribute("id", "IDACom");
    ocx.setAttribute("height", 0);
    ocx.setAttribute("width", 0);
    ocx.setAttribute("classid", "clsid:33BBBFD1-0A97-4339-9032-F68F19CB303B");
    return ocx;
}

function IsIE() {
    var userAgent = navigator.userAgent;
    if ((userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE"))
        || userAgent.indexOf("Trident/7.0") > -1) {
        return true;
    } else {
        return false;
    }
}


/**
 * 控件检查，如果版本不一致则跳转到控件下载页
 * @param win
 *            windows
 * @param mips
 *            中标麒麟
 * @param aarch
 *            银河麒麟
 * @returns
 */
function checkctl(win, mips, aarch) {
    var cos = getos();
    var localVersion;
    var serverControlVersion;
    var checkok = false;
    if (checkok == "true") {
        return;
    }
    if (cos == 'windows') {
        serverControlVersion = win;
    } else if (cos == 'linux_mips') {
        serverControlVersion = mips;
    } else if (cos == 'linux_aarch') {
        serverControlVersion = aarch;
    }
    try {
        localVersion = IDA.GetVersion();
        console.log("localversion", localVersion)
        if (localVersion == -1) {
            window.location.href = "/ggfw/ztyy#/download?serverv=" + serverControlVersion;
            return;
        }
    } catch (e) {
        window.location.href = "/ggfw/ztyy#/download?serverv=" + serverControlVersion;
        return;
    }
    if (compare(localVersion, serverControlVersion)) {
        window.location.href = "/ggfw/ztyy#/download?serverControlVersion=" + serverControlVersion;
        return;
    }
}


/**
 * 控件检查，如果版本不一致则跳转到控件下载页
 * @param win
 *            windows
 * @param mips
 *            中标麒麟
 * @param aarch
 *            银河麒麟
 * @returns
 */
function checkctl1(win, mips, aarch) {
    var cos = getos();
    var localVersion;
    var serverControlVersion;
    var checkok = false;
    if (checkok == "true") {
        return true;
    }
    if (cos == 'windows') {
        serverControlVersion = win;
    } else if (cos == 'linux_mips') {
        serverControlVersion = mips;
    } else if (cos == 'linux_aarch') {
        serverControlVersion = aarch;
    }
    try {
        localVersion = IDA.GetVersion();
        console.log("localversion", localVersion)
        if (localVersion == -1) {
            return false;
        } else {
            return true;
        }
    } catch (e) {
        return false;
    }
    if (compare(localVersion, serverControlVersion)) {
        return false;
    } else {
        return true;
    }
}

//alert("加载了XMLHttpRequest!");

function _sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

function Ajax(senddata, url) {
    //1.创建Ajax对象
    var xmlHttp = null;
    var url = "http://127.0.0.1:46679";
    //var url = "http://172.16.24.122:46685";
    //var url = "http://172.16.25.97:46679";
    //var url = "http://172.16.25.95:46679";
    //2.连接服务器 open方法只是启动一个请求以备发送，还未发送
    var xmlHttp = new XMLHttpRequest();
    //var xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    //url = url || "http://172.16.25.97:46679"
    ////url = url || "https://127.0.0.1:46681"
    //url = url || "http://127.0.0.1:46679"
    xmlHttp.open("POST", url, false);//false: 同步
    xmlHttp.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    //3.发送请求
    try {
        //alert(senddata);
        xmlHttp.send(senddata);
    } catch (e) {
        xmlHttp.abort();
        if (JSON.parse(senddata).name != "GetVersion") {
            console.log("服务连接失败！")
            // alert("服务连接失败！");
        }
        return;
    }
    //alert(xmlHttp.responseText);
    //4.接收返回值 和服务器通讯的时候此事件发生
    if (xmlHttp.status == 200) {
        if (xmlHttp.responseText == null) {
            return;
        }
        return xmlHttp.responseText;
    } else {
        return;
    }
}

//判断客户端操作系统类型
function getos() {
    var sUserAgent = navigator.userAgent;
    var wl = navigator.platform;
    if (wl.search("Win") != -1) {
        return "windows";
    } else {
        if (sUserAgent.search('mips') != -1) {
            return "linux_mips";
        } else if (sUserAgent.search("aarch") != -1) {
            //银河麒麟
            return "linux_aarch";
        } else {
            return "linux";
        }
    }
}


function compare(local, server) {
    var mark1 = local.indexOf(".") != -1 ? "." : ",";
    var mark2 = server.indexOf(".") != -1 ? "." : ",";
    var locals = local.split(mark1);
    var servers = server.split(mark2);

    for (var i = 0; i < locals.length; i++) {
        if (parseInt(locals[i]) < parseInt(servers[i])) {
            return true;
        } else if (parseInt(locals[i]) == parseInt(servers[i])) {
            continue;
        } else {
            return false;
        }
    }
    return false;
}

function AjaxCom(Cmdname, port) {
    var result;
    port = port || 46679;
    var res = IDACom.JITRequest(Cmdname, port);
    //4.接收返回值 和服务器通讯的时候此事件发生
    if (res != null) {
        return res;
    } else {
        if (JSON.parse(Cmdname).name != "GetVersion") {
            console.log("服务连接失败！");
        }
        return;
    }
}

function mylastIndex(str) {
    var tmpchar;
    var count = 0;
    for (i = 0; i < str.length; i++) {
        tmpchar = str.charAt(i);
        if (count == 0 && i > 0) {
            return i;
        }
        if (tmpchar == '{') {
            count++;
        }
        if (tmpchar == '}') {
            count--;
        }
    }
}

function _Getretcode(Cmdname) {
    var ret = -1;
    var str;

    if (IsIE()) {
        //IE浏览器
        str = AjaxCom(Cmdname);
    } else {
        //非IE浏览器
        str = Ajax(Cmdname);
    }
    if (!str) {
        return ret;
    }
    try {
        str = str.substr(0, mylastIndex(str));
        ret = JSON.parse(str).error;
    } catch (e) {
        console.log("Caught: " + e.message);
    }
    return ret;
}

function _Getretmsg(Cmdname) {
    var ret = -1;
    var str;
    if (IsIE()) {
        str = AjaxCom(Cmdname);
    } else {
        str = Ajax(Cmdname);
    }
    if (!str) {
        return ret;
    }
    try {
        str = str.substr(0, mylastIndex(str));
        ret = JSON.parse(str).value;
    } catch (e) {
        console.log("Caught: " + e.message);
    }
    return ret;
}

// 46685 lra service
function _LraGetretmsg(Cmdname) {
    var ret = -1;
    var str;
    if (IsIE()) {
        str = AjaxCom(Cmdname, 46685);
    } else {
        str = Ajax(Cmdname, "http://127.0.0.1:46685");
    }
    if (!str) {
        return ret;
    }
    try {
        str = str.substr(0, mylastIndex(str));
        ret = JSON.parse(str).value;
    } catch (e) {
        console.log("Caught: " + e.message);
    }
    return ret;
}

function _Getretvalue(Cmdname) {
    var ret = "";
    var str = Ajax(Cmdname);
    ret = "返回信息：" + eval('(' + str + ')').value + "     返回错误码："
        + eval('(' + str + ')').error;
    return ret;
}

/**********************websocket+客户端平台*********************************/
var IDA = function () {
    var FinalizeCmd = "{\"name\": \"Finalize\"}";
    var GeterrocodeCmd = "{\"name\": \"GetErrorCode\"}";
    var GetVersionCmd = "{\"name\": \"GetVersion\"}";
    // 对外暴露方法
    return {
        // common
        Initialize: function (xmlBuffer, interfaceLibName) {
            var InitCmd = "{\"name\": \"RegisterParam\", \"p1\": \"" + xmlBuffer
                + "\",\"p2\": \"" + interfaceLibName + "\",\"p3\":" + false + "}";
            return _Getretcode(InitCmd);
        },
        InitializeEx: function (xmlBuffer, interfaceLibName, isRefresh) {
            var InitCmd = "{\"name\": \"Initialize\", \"p1\": \"" + xmlBuffer
                + "\",\"p2\": \"" + interfaceLibName + "\",\"p3\":" + isRefresh + "}";
            return _Getretcode(InitCmd);
        },
        Finalize: function () {
            return _Getretcode(FinalizeCmd);
        },
        GetErrorCode: function () {
            return _Getretcode(GeterrocodeCmd);
        },
        GetErrorMessage: function (errorcode) {
            var GeterromessageCmd = "{\"name\": \"GetErrorMessage\", \"p1\": "
                + errorcode + "}";
            return _Getretmsg(GeterromessageCmd);
        },
        GetVersion: function () {
            return _Getretmsg(GetVersionCmd);
        },
        GetIDAVersion: function () {
            return IDACom.GetVersion();
        },
        SetPinCode: function (p1) {
            var SetPinCodeCmd = "{\"name\": \"SetPinCode\", \"p1\": \"" + p1 + "\"}";
            return _Getretmsg(SetPinCodeCmd);
        },
        RegisterParam: function (p1, p2, isRefresh) {
            var RegisterParamCmd = "{\"name\": \"RegisterParam\", \"p1\": \""
                + p1 + "\",\"p2\": \"" + p2 + "\",\"p3\":" + isRefresh + "}";
            return _Getretcode(RegisterParamCmd);
        },
        AssignPinCode: function (p1) {
            var AssignPinCodeCmd = "{\"name\": \"AssignPinCode\", \"p1\": \"" + p1 + "\"}";
            return _Getretmsg(AssignPinCodeCmd);
        },
        /** *********************** SM2证书业务 ************************* */
        CreatePKCS10: function (asymmAlg, keyLength, appName, containerName,
                                certCN) {
            var CreatPKCS10Cmd = "{\"name\": \"CreatePKCS10\", \"p1\": \""
                + asymmAlg + "\",\"p2\":" + keyLength + ",\"p3\": \""
                + appName + "\",\"p4\": \"" + containerName
                + "\",\"p5\": \"" + certCN + "\"}";
            return _Getretmsg(CreatPKCS10Cmd);
        },
        CreatePubKey: function (asymmAlg, keyLength, appName, containerName) {
            var CreatePubKeyCmd = "{\"name\": \"CreatePubKey\", \"p1\": \""
                + asymmAlg + "\",\"p2\":" + keyLength + ",\"p3\": \""
                + appName + "\",\"p4\": \"" + containerName + "\"}";
            return _Getretmsg(CreatePubKeyCmd);
        },
        GetDeviceList: function () {
            var GetDeviceListCmd = "{\"name\": \"GetDeviceList\"}";
            return _Getretmsg(GetDeviceListCmd);
        },
        SetDeviceName: function (devName) {
            var SetDeviceNameCmd = "{\"name\": \"SetDeviceName\", \"p1\": \""
                + devName + "\"}";
            return _Getretcode(SetDeviceNameCmd);
        },
        InstallSignCert: function (certBuffer) {
            var InstallSignCertCmd = "{\"name\": \"InstallSignCert\", \"p1\": \""
                + certBuffer + "\"}";
            return _Getretcode(InstallSignCertCmd);
        },
        InstallEncryptCert: function (encryptSessionKey, sessionKeyType,
                                      encryptedPrivateKey, encryptCert) {
            var InstallEncryptCertCmd = "{\"name\": \"InstallEncryptCert\", \"p1\": \""
                + encryptSessionKey
                + "\",\"p2\": \""
                + sessionKeyType
                + "\",\"p3\": \""
                + encryptedPrivateKey
                + "\",\"p4\": \""
                + encryptCert + "\"}";
            return _Getretcode(InstallEncryptCertCmd);
        },
        DeleteCertificate: function (certSN) {
            var DeleteCertificateCmd = "{\"name\": \"DeleteCertificate\", \"p1\": \""
                + certSN + "\"}";
            return _Getretcode(DeleteCertificateCmd);
        },
        CreatePKCS10FromExistCert: function (isSignCert, certSN) {
            var CreatePKCS10FromExistCertCmd = "{\"name\": \"CreatePKCS10FromExistCert\", \"p1\": "
                + isSignCert + ", \"p2\": \"" + certSN + "\"}";
            return _Getretmsg(CreatePKCS10FromExistCertCmd);
        },
        FindPKCS10: function (isSignCert, certSN) {
            var FindPKCS10Cmd = "{\"name\": \"FindPKCS10\", \"p1\": "
                + isSignCert + ", \"p2\": \"" + certSN + "\"}";
            return _Getretmsg(FindPKCS10Cmd);
        },
        CreateApplication: function (usIsCreateFlag, applicationName, adminPin,
                                     ulAdminPinRetryCount, UserPin, ulUserPinRetryCount) {
            var CreateApplicationCmd = "{\"name\": \"CreateApplication\", \"p1\":"
                + usIsCreateFlag
                + ",\"p2\": \""
                + applicationName
                + "\",\"p3\": \""
                + adminPin
                + "\",\"p4\":"
                + ulAdminPinRetryCount
                + ",\"p5\": \""
                + UserPin
                + "\",\"p6\":" + ulUserPinRetryCount + "}";
            return _Getretcode(CreateApplicationCmd);
        },
        FormatKey: function () {
            var FormatKeyCmd = "{\"name\": \"FormatKey\"}";
            return _Getretcode(FormatKeyCmd);
        },
        P1ByCertEntity: function (cert, data) {
            var P1ByCertEntityCmd = "{\"name\": \"P1ByCertEntity\", \"p1\": \""
                + cert + "\", \"p2\": \"" + data + "\"}";
            return _Getretmsg(P1ByCertEntityCmd);
        },
        LoadDeviceBySN: function (isSignCert, certSN) {
            var LoadDeviceBySNCmd = "{\"name\": \"LoadDeviceBySN\", \"p1\": "
                + isSignCert + ", \"p2\": \"" + certSN + "\"}";
            return _Getretcode(LoadDeviceBySNCmd);
        },
        ExportCert: function () {
            var ExportCertCmd = "{\"name\": \"ExportCert\"}";
            return _Getretcode(ExportCertCmd);
        },
        SetContainerName: function (containerName) {
            var SetContainerNameCmd = "{\"name\": \"SetContainerName\",\"p1\": \""
                + containerName + "\"}";
            return _Getretcode(SetContainerNameCmd);
        },
        GetContainerName: function () {
            var GetContainerNameCmd = "{\"name\": \"GetContainerName\"}";
            return _Getretmsg(GetContainerNameCmd);
        },
        SetInterfaceLibName: function (libName) {
            var SetInterfaceLibNameCmd = "{\"name\": \"SetInterfaceLibName\",\"p1\": \""
                + libName + "\"}";
            return _Getretcode(SetInterfaceLibNameCmd);
        },
        GetSNList: function () {
            var GetSNListCmd = "{\"name\": \"GetSNList\"}";
            return _Getretmsg(GetSNListCmd);
        },
        GetCertLists: function (strCertType, strCertDN, strCertSN,
                                strCertEmail, strCertIssuerDN, lInfoType) {
            var GetCertListsCmd = "{\"name\": \"GetCertLists\", \"p1\": \""
                + strCertType + "\", \"p2\": \"" + strCertDN
                + "\", \"p3\": \"" + strCertSN + "\", \"p4\": \""
                + strCertEmail + "\", \"p5\": \"" + strCertIssuerDN
                + "\", \"p6\": " + lInfoType + "}";
            return _Getretmsg(GetCertListsCmd);
        },
        P1SignStr_Batch: function (strSN, strpincode, randomstr) {
            var P1SignStr_BatchCmd = "{\"name\": \"BatchCmd\", "
                + "\"Items\": [{\"name\": \"SetCertChooseType\", \"p1\": "
                + "1"
                + "},"
                + "{\"name\": \"SetCert\", \"p1\": \"SC\", \"p2\": \"\", \"p3\": \""
                + strSN + "\", \"p4\": \"\", \"p5\": \"\", \"p6\": \"\"},"
                + "{\"name\": \"SetPinCode\", \"p1\": \"" + strpincode
                + "\"},"
                + "{\"name\": \"P1SignStr\", \"p1\": \"\", \"p2\": \""
                + randomstr + "\"}]}";

            return _Getretmsg(P1SignStr_BatchCmd);
        },
        P7SignStr_Batch: function (bDetach, bIncludeCert, strSN, strpincode, randomstr) {
            var P7SignStr_BatchCmd = "{\"name\": \"BatchCmd\", "
                + "\"Items\": [{\"name\": \"SetCertChooseType\", \"p1\": "
                + "1"
                + "},"
                + "{\"name\": \"SetCert\", \"p1\": \"SC\", \"p2\": \"\", \"p3\": \""
                + strSN + "\", \"p4\": \"\", \"p5\": \"\", \"p6\": \"\"},"
                + "{\"name\": \"SetPinCode\", \"p1\": \"" + strpincode
                + "\"},"
                + "{\"name\": \"P7SignStr\", \"p1\": \"\", \"p2\": "
                + bDetach + ",\"p3\": "
                + bIncludeCert + ",\"p4\": \""
                + randomstr + "\"}]}";

            return _Getretmsg(P7SignStr_BatchCmd);
        },
        P7SignStrEx_Batch: function (bDetach, bIncludeCert, strSN, strpincode, randomstr) {
            var P7SignStr_BatchCmd = "{\"name\": \"BatchCmd\", "
                + "\"Items\": [{\"name\": \"SetCertChooseType\", \"p1\": "
                + "1"
                + "},"
                + "{\"name\": \"SetCert\", \"p1\": \"SC\", \"p2\": \"\", \"p3\": \""
                + strSN + "\", \"p4\": \"\", \"p5\": \"\", \"p6\": \"\"},"
                + "{\"name\": \"SetPinCode\", \"p1\": \"" + strpincode
                + "\"},"
                + "{\"name\": \"P7SignStrEx\", \"p1\": \"\", \"p2\": "
                + bDetach + ",\"p3\": "
                + bIncludeCert + ",\"p4\": \""
                + randomstr + "\"}]}";

            return _Getretmsg(P7SignStr_BatchCmd);
        },
        GetCertInfo: function (strCertType, lInfoType, strOID) {
            var GetCertInfoCmd = "{\"name\": \"GetCertInfo\", \"p1\": \""
                + strCertType + "\", \"p2\": " + lInfoType + ", \"p3\": \""
                + strOID + "\"}";
            return _Getretmsg(GetCertInfoCmd);
        },
        InstallEncCert: function (certBuffer) {
            var InstallEncCertCmd = "{\"name\": \"InstallEncCert\", \"p1\": \""
                + certBuffer + "\"}";
            return _Getretcode(InstallEncCertCmd);
        },
        GetDevSN: function () {
            var GetDevSNCmd = "{\"name\": \"GetDevSN\"}";
            return _Getretmsg(GetDevSNCmd);
        },
        UnblockPin: function (appName, adminPin, newPin) {
            var UnblockPINCmd = "{\"name\": \"UnblockPin\", \"p1\": \""
                + appName + "\", \"p2\":  \""
                + adminPin + "\", \"p3\": \""
                + newPin + "\"}";
            return _Getretcode(UnblockPINCmd);
        },
        ChangePin: function (appName, pinType, oldPin, newPin) {
            var ChangePinCmd = "{\"name\": \"ChangePin\", \"p1\": \""
                + appName + "\", \"p2\": \""
                + pinType + "\", \"p3\": \""
                + oldPin + "\", \"p4\": \""
                + newPin + "\"}";
            return _Getretcode(ChangePinCmd);
        },
        SetAdminDevLabel: function (AdminDevLabel) {
            var SetAdminDevLabelCmd = "{\"name\": \"SetAdminDevLabel\", \"p1\": \"" + AdminDevLabel + "\"}";
            return _Getretcode(SetAdminDevLabelCmd);
        },
        VerifyPin: function (appName, pinType, PinCode) {
            var ChangePinCmd = "{\"name\": \"VerifyPin\", \"p1\": \""
                + appName + "\", \"p2\": \""
                + pinType + "\", \"p3\": \""
                + PinCode + "\"}";
            return _Getretcode(ChangePinCmd);
        },
        IsExistApplication: function (appName) {
            var IsExistAppCmd = "{\"name\": \"IsExistApplication\", \"p1\": \""
                + appName + "\"}";
            return _Getretcode(IsExistAppCmd);
        },
        GetKeyDllName: function () {
            var GetKeyDllNameCmd = "{\"name\": \"GetKeyDllName\"}";
            return _Getretmsg(GetKeyDllNameCmd);
        },
        OpenContainer: function (containerName) {
            var OpenContainerCmd = "{\"name\": \"OpenContainer\", \"p1\": \""
                + containerName + "\"}";
            return _Getretcode(OpenContainerCmd);
        },
        CheckCertIsExist: function (certSN) {
            var CheckCertIsExistCmd = "{\"name\": \"CheckCertIsExist\", \"p1\": \""
                + certSN + "\"}";
            return _Getretcode(CheckCertIsExistCmd);
        },
        RefreshCertList: function (bWait) {
            var RefreshCertListCmd = "{\"name\": \"RefreshCertList\", \"p1\": "
                + bWait + "}";
            return _Getretcode(RefreshCertListCmd);
        },
        P1SignStrEx: function (strSN, strpincode, randomstr) {
            var P1SignStrExCmd = "{\"name\": \"P1SignStrEx\", \"p1\": \"" + strSN + "\", \"p2\": \""
                + randomstr + "\",\"p3\":\"" + strpincode + "\"}";

            return _Getretmsg(P1SignStrExCmd);
        },
        InstallEncryptCertByEKB: function (encryptedPrivateKey, encryptCert) {
            var InstallEncryptCertByEKBCmd = "{\"name\": \"InstallEncryptCertByEKB\", \"p1\": \""
                + encryptedPrivateKey
                + "\",\"p2\": \""
                + encryptCert + "\"}";
            return _Getretcode(InstallEncryptCertByEKBCmd);
        },
        ChangeDevAuthKey: function (oldDevPin, newDevPin, algName) {
            var ChangeDevAuthKeyCmd = "{\"name\": \"ChangeDevAuthKey\", \"p1\": \"" + oldDevPin
                + "\",\"p2\": \"" + newDevPin
                + "\",\"p3\": \"" + algName
                + "\"}";
            return _Getretcode(ChangeDevAuthKeyCmd);
        },
        SetCert: function (strCertType, strCertDN, strCertSN, strCertEmail, strCertIssuerDN, strCertBase64) {
            var ChangeDevAuthKeyCmd = "{\"name\": \"SetCert\", \"p1\": \"" + strCertType + "\", \"p2\": \"" + strCertDN + "\", \"p3\": \""
                + strCertSN + "\", \"p4\": \"" + strCertEmail + "\", \"p5\": \"" + strCertIssuerDN + "\", \"p6\": \"" + strCertBase64 + "\"},"
                + "\"}";
            return _Getretcode(ChangeDevAuthKeyCmd);
        },
        GetCertBySN: function (strCertSN) {
            var GetCertCmd = "{\"name\": \"GetCertBySN\", \"p1\": \"" + strCertSN + "\"}";
            return _Getretmsg(GetCertCmd);
        },
        EnumCertInfo: function (strCertSN) {
            var EnumCertInfoCmd = "{\"name\": \"EnumCertInfo\", \"p1\": \"" + strCertSN + "\"}";
            return _Getretmsg(EnumCertInfoCmd);
        },
        GetIFMaxTime: function () {
            var TestRefreshLockCmd = "{\"name\": \"GetIFMaxTime\"}";
            return _Getretcode(TestRefreshLockCmd);
        },

        P1VerifySignStr: function (pstrCertSN, strOrgDataB64, strSignedDataB64) {
            var P1VerifySignStrCmd = "{\"name\": \"P1VerifySignStr\", \"p1\": \"" + pstrCertSN
                + "\",\"p2\": \"" + strOrgDataB64
                + "\",\"p3\": \"" + strSignedDataB64
                + "\"}";
            return _Getretcode(P1VerifySignStrCmd);
        },
        P7VerifyAttachedSign: function (strP7Base64) {
            var VerifyAttachedSignCmd = "{\"name\": \"VerifyAttachedSign\", \"p1\": \"" + strP7Base64 + "\"}";
            return _Getretcode(VerifyAttachedSignCmd);
        },
        P7VerifyDetachedSign: function (strP7Base64, strSrcDataBase64) {
            var VerifyDetachedSignCmd = "{\"name\": \"VerifyDetachedSign\", \"p1\": \"" + strP7Base64
                + "\",\"p2\": \"" + strSrcDataBase64
                + "\"}";
            return _Getretcode(VerifyDetachedSignCmd);
        },
        P7EncryptEnvelop: function (strOrgDataBase64, strEncAlg) {
            var EncryptEnvelopCmd = "{\"name\": \"EncryptEnvelop\", \"p1\": \"" + strOrgDataBase64
                + "\",\"p2\": \"" + strEncAlg
                + "\"}";
            return _Getretmsg(EncryptEnvelopCmd);
        },
        P7DecryptEnvelop: function (strEncBase64Data) {
            var DecryptEnvelopCmd = "{\"name\": \"DecryptEnvelop\", \"p1\": \"" + strEncBase64Data
                + "\"}";
            return _Getretmsg(DecryptEnvelopCmd);
        },
        SymmEncrypt: function (strSymmetricKey, strSrcData, strEncAlg, isPad) {
            var SymmEncryptCmd = "{\"name\": \"SymmEncrypt\", \"p1\": \"" + strSymmetricKey
                + "\",\"p2\": \"" + strSrcData
                + "\",\"p3\": \"" + strEncAlg
                + "\",\"p4\":" + isPad
                + "}";
            return _Getretmsg(SymmEncryptCmd);
        },
        SymmDecrypt: function (strSymmetricKey, strEncryptData, strEncAlg, isPad) {
            var SymmEncryptCmd = "{\"name\": \"SymmDecrypt\", \"p1\": \"" + strSymmetricKey
                + "\",\"p2\": \"" + strEncryptData
                + "\",\"p3\": \"" + strEncAlg
                + "\",\"p4\":" + isPad
                + "}";
            return _Getretmsg(SymmEncryptCmd);
        },
        DeleteContainer: function (bHaveCert) {
            var DeleteContainerCmd = "{\"name\": \"DeleteContainer\", \"p1\":" + bHaveCert + "}";
            return _Getretcode(DeleteContainerCmd);
        },
        GetDeviceListEx: function () {
            var GetDeviceListCmd = "{\"name\": \"GetDeviceListEx\"}";
            return _Getretmsg(GetDeviceListCmd);
        },
        GetApplicationList: function () {
            var GetApplicationListCmd = "{\"name\": \"GetApplicationList\"}";
            return _Getretmsg(GetApplicationListCmd);
        },
        DeleteApplications: function (appList) {
            var DelApplicationsCmd = "{\"name\": \"DelApplications\", \"p1\":\"" + appList + "\"}";
            return _Getretcode(DelApplicationsCmd);
        },
        GetKeyTypeValue: function () {
            var GetKeyTypeValueCmd = "{\"name\": \"GetKeyTypeValue\"}";
            return _Getretmsg(GetKeyTypeValueCmd);
        },
        CSPInitialize: function () {
            var InitCmd = "{\"name\": \"CSPInitialize\"}";
            return _Getretcode(InitCmd);
        },
        CSPFinalize: function () {
            var FinCmd = "{\"name\": \"CSPFinalize\"}";
            return _Getretcode(FinCmd);
        },
        CSPGetErrorCode: function () {
            var CSPGeterrocodeCmd = "{\"name\": \"CSPGetErrorCode\"}";
            return _Getretcode(CSPGeterrocodeCmd);
        },
        CSPGetErrorMessage: function (errorcode) {
            var GeterromessageCmd = "{\"name\": \"CSPGetErrorMessage\", \"p1\": "
                + errorcode + "}";
            return _Getretmsg(GeterromessageCmd);
        },
        CSPGetVersion: function () {
            var CSPGetVersionCmd = "{\"name\": \"CSPGetVersion\"}";
            return _Getretmsg(CSPGetVersionCmd);
        },
        CSPGetCSPName: function () {
            var GetCSPNameCmd = "{\"name\": \"CSPGetCSPName\"}";
            return _Getretmsg(GetCSPNameCmd);
        },
        CSPGetCSPCount: function () {
            var GetCSPCountCmd = "{\"name\": \"CSPGetCSPCount\"}";
            return _Getretmsg(GetCSPCountCmd);
        },
        CSPGetCSPNameex: function (index) {
            var GetCSPNameExCmd = "{\"name\": \"CSPGetCSPNameex\", \"p1\":" + index + "}";
            return _Getretmsg(GetCSPNameExCmd);
        },
        CSPSetCSPType: function (type) {
            var SetCSPTypeCmd = "{\"name\": \"CSPSetCSPType\", \"p1\":" + type + "}";
            return _Getretcode(SetCSPTypeCmd);
        },
        CSPSetCSPInfo: function (keyLength, cspName) {
            var SetCSPInfoCmd = "{\"name\": \"CSPSetCSPInfo\", \"p1\":" + keyLength + ",\"p2\":\"" + cspName + "\"}";
            return _Getretcode(SetCSPInfoCmd);
        },
        CSPCreatePKCS10: function (cspName, subjectDN, keyLength, keySpec) {
            var CreatePKCS10Cmd = "{\"name\": \"CSPCreatePKCS10\", \"p1\":\"" + cspName +
                "\",\"p2\":\"" + subjectDN + "\",\"p3\":" + keyLength + ",\"p4\":" + keySpec + "}";
            return _Getretmsg(CreatePKCS10Cmd);
        },
        CSPCreateTempPKCS10: function () {
            var CreateTempPKCS10Cmd = "{\"name\": \"CSPCreateTempPKCS10\"}";
            return _Getretmsg(CreateTempPKCS10Cmd);
        },
        CSPInstallSignCert: function (cspName, p7b, keySpec) {
            var InstallSignCertCmd = "{\"name\": \"CSPInstallSignCert\", \"p1\":\"" + cspName + "\",\"p2\":\"" + p7b + "\",\"p3\":" + keySpec + "}";
            return _Getretcode(InstallSignCertCmd);
        },
        CSPUpdateSignCertEx: function (cspName, p7b, keySpec) {
            var UpdateSignCertExCmd = "{\"name\": \"CSPUpdateSignCertEx\", \"p1\":\"" + cspName + "\",\"p2\":\"" + p7b + "\",\"p3\":" + keySpec + "}";
            return _Getretcode(UpdateSignCertExCmd);
        },
        CSPInstallEncryptCert: function (cspName, keyLength, encryptedSessionKey, sessionKeyType, encryptedPrivateKey, p7b, keySpec) {
            var InstallEncryptCertCmd = "{\"name\": \"CSPInstallEncryptCert\", \"p1\":\"" + cspName + "\",\"p2\":" + keyLength + ",\"p3\":\"" + encryptedSessionKey + "\",\"p4\":\"" + sessionKeyType + "\",\"p5\":\"" + encryptedPrivateKey + "\",\"p6\":\"" + p7b + "\",\"p7\":" + keySpec + "}";
            return _Getretcode(InstallEncryptCertCmd);
        },
        CSPInstallEncCertEx: function (cspName, keyLength, encryptedSessionKey, sessionKeyType, encryptedPrivateKey, p7b, keySpec) {
            var InstallEncCertExCmd = "{\"name\": \"CSPInstallEncCertEx\", \"p1\":\"" + cspName + "\",\"p2\":" + keyLength + ",\"p3\":\"" + encryptedSessionKey + "\",\"p4\":\"" + sessionKeyType + "\",\"p5\":\"" + encryptedPrivateKey + "\",\"p6\":\"" + p7b + "\",\"p7\":" + keySpec + "}";
            return _Getretcode(InstallEncCertExCmd);
        },
        CSPInstallDoubleCert: function (cspName, keyLength, sessionKeyType, encryptSessionKey1, encryptPriKey1, p7b1, encryptSessionKey2, encryptPriKey2, p7b2) {
            var InstallDoubleCertCmd = "{\"name\": \"CSPInstallDoubleCert\", \"p1\":\"" + cspName + "\",\"p2\":" + keyLength + ",\"p3\":\"" + sessionKeyType + "\",\"p4\":\"" + encryptSessionKey1 + "\",\"p5\":\"" + encryptPriKey1 + "\",\"p6\":\"" + p7b1 + "\",\"p7\":\"" + encryptSessionKey2 + "\",\"p8\":\"" + encryptPriKey2 + "\"}";
            return _Getretcode(InstallDoubleCertCmd);
        },
        CSPInstallDoubleCertEx: function (cspName, keyLength, sessionKeyType, encryptSessionKey1, encryptPriKey1, p7b1, p7b1SN, encryptSessionKey2, encryptPriKey2, p7b2, p7b2SN, oneContainer) {
            var InstallDoubleCertExCmd = "{\"name\": \"CSPInstallDoubleCertEx\", \"p1\":\"" + cspName + "\",\"p2\":" + keyLength + ",\"p3\":\"" + sessionKeyType + "\",\"p4\":\"" + encryptSessionKey1 + "\",\"p5\":\"" + encryptPriKey1 + "\",\"p6\":\"" + p7b1 + "\",\"p7\":\"" + p7b1SN + "\",\"p8\":\"" + encryptSessionKey2 + "\",\"p9\":\"" + encryptPriKey2 + "\",\"p10\":\"" + p7b2 + "\",\"p11\":\"" + p7b2SN + "\",\"p12\":" + oneContainer + "}";
            return _Getretcode(InstallDoubleCertExCmd);
        },
        CSPSetContainerName: function (containerName) {
            var SetContainerNameCmd = "{\"name\": \"CSPSetContainerName\", \"p1\":\"" + containerName + "\"}";
            return _Getretcode(SetContainerNameCmd);
        },
        CSPGetContainerName: function () {
            var GetContainerNameCmd = "{\"name\": \"CSPGetContainerName\"}";
            return _Getretmsg(GetContainerNameCmd);
        },
        CSPDeleteCertificate: function (certSN, delKey) {
            var DeleteCertificateCmd = "{\"name\": \"CSPDeleteCertificate\", \"p1\":\"" + certSN + "\",\"p2\":" + delKey + "}";
            return _Getretcode(DeleteCertificateCmd);
        },
        CSPCreatePKCS10FromExistCert: function (cspName, subject, certSN, keySpec) {
            var CreatePKCS10FromExistCertCmd = "{\"name\": \"CSPCreatePKCS10FromExistCert\", \"p1\":\"" + cspName + "\",\"p2\":\"" + subject + "\",\"p3\":\"" + certSN + "\",\"p4\":" + keySpec + "}";
            return _Getretmsg(CreatePKCS10FromExistCertCmd);
        },
        CSPSetPrivateKeyExportable: function (isExportable) {
            var SetPrivateKeyExportableCmd = "{\"name\": \"CSPSetPrivateKeyExportable\", \"p1\":" + isExportable + "}";
            return _Getretcode(SetPrivateKeyExportableCmd);
        },
        CSPGetCSPNameBySN: function (SN) {
            var GetCSPNameBySNCmd = "{\"name\": \"CSPGetCSPNameBySN\", \"p1\":\"" + SN + "\"}";
            return _Getretmsg(GetCSPNameBySNCmd);
        },
        CSPGetSignedData: function (randomData) {
            var GetSignedDataCmd = "{\"name\": \"CSPGetSignedData\", \"p1\":\"" + randomData + "\"}";
            return _Getretmsg(GetSignedDataCmd);
        },
        CSPInstallSignCertEx: function (cspName, signP7b, signP7bLen, oldSN, keySpec) {
            var InstallSignCertExCmd = "{\"name\": \"CSPInstallSignCertEx\", \"p1\":\"" + cspName +
                "\",\"p2\":\"" + signP7b + "\",\"p3\":" + signP7bLen + ",\"p4\":\"" + oldSN + "\",\"p5\":" + keySpec + "}";
            return _Getretcode(InstallSignCertExCmd);
        },
        CSPGetUSBKeyDevCount: function () {
            var GetUSBKeyDevCountCmd = "{\"name\": \"CSPGetUSBKeyDevCount\"}";
            return _Getretmsg(GetUSBKeyDevCountCmd);
        },
        CSPGetUSBKeyDevInfo: function () {
            var GetUSBKeyDevInfoCmd = "{\"name\": \"CSPGetUSBKeyDevInfo\"}";
            return _Getretmsg(GetUSBKeyDevInfoCmd);
        },
        CSPGetUSBKEYID: function (slotID) {
            var GetUSBKEYIDCmd = "{\"name\": \"CSPGetUSBKEYID\", \"p1\":" + slotID + "}";
            return _Getretmsg(GetUSBKEYIDCmd);
        },
        CSPSetP11FileName: function (p11FileName) {
            var SetP11FileNameCmd = "{\"name\": \"CSPSetP11FileName\", \"p1\":\"" + p11FileName + "\"}";
            return _Getretcode(SetP11FileNameCmd);
        },
        CSPUnLockUSBKey: function (slotID, bstrAdminPIN, bstrUserPIN) {
            var UnLockUSBKeyCmd = "{\"name\": \"CSPUnLockUSBKey\", \"p1\":" + slotID +
                ",\"p2\":\"" + bstrAdminPIN +
                "\",\"p3\":\"" + bstrUserPIN +
                "\"}";
            return _Getretcode(UnLockUSBKeyCmd);
        },
        CSPSetUSBKeyPIN: function (slotID, bstrOldPIN, bstrNewPIN) {
            var SetUSBKeyPINCmd = "{\"name\": \"CSPSetUSBKeyPIN\", \"p1\":" + slotID +
                ",\"p2\":\"" + bstrOldPIN +
                "\",\"p3\":\"" + bstrNewPIN +
                "\"}";
            return _Getretcode(SetUSBKeyPINCmd);
        },
        CSPGetTempPublickey: function () {
            var GetTempPublickeyCmd = "{\"name\": \"CSPGetTempPublickey\"}";
            return _Getretmsg(GetTempPublickeyCmd);
        },
        CSPSetKMCCertSt: function (encryptedSessionKey, encryptedPrivateKey, p7Cert, calgrsa) {
            var SetKMCCertStCmd = "{\"name\": \"CSPSetKMCCertSt\", \"p1\":\"" + encryptedSessionKey +
                "\",\"p2\":\"" + encryptedPrivateKey +
                "\",\"p3\":\"" + p7Cert +
                "\",\"p4\":" + calgrsa +
                "}";
            return _Getretcode(SetKMCCertStCmd);
        },
        CSPUpdateCert: function (oldCert, CSPName, newP7b) {
            var UpdateCertCmd = "{\"name\": \"CSPUpdateCert\", \"p1\": \"" + oldCert
                + "\",\"p2\": \"" + CSPName
                + "\",\"p3\": \"" + newP7b
                + "\"}";
            return _Getretcode(UpdateCertCmd);
        },
        CSPUpdateCertEx: function (oldCert, CSPName, newP7b) {
            var UpdateCertExCmd = "{\"name\": \"CSPUpdateCertEx\", \"p1\": \"" + oldCert
                + "\",\"p2\": \"" + CSPName
                + "\",\"p3\": \"" + newP7b
                + "\"}";
            return _Getretcode(UpdateCertExCmd);
        },
        CSPUnLockUSBKeyDevice: function (strKeyId, nDllType, strApplicationName, strDllName, strAdminPIN, strNewUserPIN) {
            var UnLockUSBKeyDeviceCmd = "{\"name\": \"CSPUnLockUSBKeyDevice\", \"p1\":\"" + strKeyId +
                "\",\"p2\":" + dllType +
                ",\"p3\":\"" + strApplicationName +
                "\",\"p4\":\"" + strDllName +
                "\",\"p5\":\"" + strAdminPIN +
                "\",\"p6\":\"" + strNewUserPIN +
                "\"}";
            return _Getretcode(UnLockUSBKeyDeviceCmd);
        },
        LraGetVersion: function () {
            var GetVersionCmd = "{\"name\": \"GetVersion\"}";
            return _LraGetretmsg(GetVersionCmd);
        },
        LraIsRun: function () {
            var IsRunCmd = "{\"name\": \"IsRun\"}";
            return _LraGetretmsg(IsRunCmd);
        },
        LraGetData: function () {
            var GetDataCmd = "{\"name\": \"GetData\"}";
            return _LraGetretmsg(GetDataCmd);
        },
        LraLraName: function () {
            var LraNameCmd = "{\"name\": \"LraName\"}";
            return _LraGetretmsg(LraNameCmd);
        }
    }
}();

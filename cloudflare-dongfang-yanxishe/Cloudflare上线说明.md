# Cloudflare Pages 上线说明

## 上传方式

把本文件夹 `cloudflare-dongfang-yanxishe` 上传到 Cloudflare Pages。

如果 Cloudflare Pages 要求上传 zip，请上传：

`cloudflare-dongfang-yanxishe.zip`

## 表单与人工细读

这个版本不使用 Netlify Forms，也不跳转 Fillout。

用户可以直接在网页里填写出生资料并生成基础八字画像，包括基础排盘、大运流年、日主气质、五行色彩、体质倾向、脸部状态和穿搭提示。

页面里的“预约人工细读”按钮会把用户资料复制到剪贴板，并提示添加微信：

`OVA_Yanxishe`

## 用户流程

1. 用户填写页面资料。
2. 点击“先生成免费画像”，页面显示基础八字画像。
3. 如果用户希望继续细读，点击“预约人工细读”。
4. 页面会复制用户资料，用户添加微信 `OVA_Yanxishe` 后发送资料。

## 新增互动区

页面已加入“每日一卦与今日气象”：今日卦象、黄历宜忌、每日穿搭色，以及财运、事业、感情、气色、心态五类今日提示。

这些内容全部在浏览器本地生成，不需要服务器，也不会占用 Cloudflare Pages 或 Netlify 的额度。

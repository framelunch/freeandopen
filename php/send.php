<?php
// ###########################################
//       メール送信 API( 動作環境: PHP5.3 )
// ###########################################

// 5.2系のPHPMailer
require './PHPMailer/class.phpmailer.php';

/* ***********************
 * POST パラメータ
 * ***********************/
$json = file_get_contents('php://input');
$post = json_decode($json, true);
$post_user_name = $post['name'];
$post_user_email = $post['email'];
$post_user_message = $post['message'];

/* ***********************
 * パラメータチェック
 * ***********************/
if (empty($post_user_email)) {
    throw new Exception('illigal params.');
}
if (empty($post_user_message)) {
    throw new Exception('illigal params.');
}

/* ***********************
 * 送信内容 ( ユーザー向け )
 * ***********************/
// メール件名
$to_user_subject = '【Freeandopen】お問合せありがとうございます';

// メール本文
$to_user_body = <<<EOT
{$post_user_name} 様

お問合せありがとうございます。
下記の内容で受け付けました。

{$post_user_message}

署名
EOT;

/* ***********************
 * 送信内容 ( 管理者向け )
 * ***********************/
// 送信先
$to_admin_email = 'sekiguchi@framelunch.jp';

// メール件名
$to_admin_subject = 'ホームページからお問合わせがありました';

// メール本文
$to_admin_body = <<<EOT

下記の内容で受け付けました。

■ お名前
{$post_user_name}

■ メールアドレス
{$post_user_email}

■ お問合せ内容
{$post_user_message}

EOT;

/* ***********************
 *         本処理
 * ***********************/
/**
 * Mailer設定系
 */
$TIMEZONE = 'Asia/Tokyo';
$FROM_CHARSET = 'UTF-8';
$TO_CHARSET = 'UTF-8';
$LANG = 'ja';
$SENDER = 'info@freeandopen.co.jp';
$SENDER_NAME = '株式会社Freeandopen';
$SENDER_PASS = 'sokos448';

date_default_timezone_set($TIMEZONE);
mb_internal_encoding($FROM_CHARSET);
mb_language($LANG);

function create_mailer() {
    global $SENDER, $SENDER_NAME, $SENDER_PASS, $TO_CHARSET, $FROM_CHARSET;
    $mailer = new PHPMailer();
    $mailer->isSMTP();
    $mailer->SMTPSecure = 'ssl';
    $mailer->Host = 'smtp.lolipop.jp';
    $mailer->Port = 465;
    $mailer->SMTPAuth = true;
    $mailer->Username = $SENDER;
    $mailer->Password = $SENDER_PASS;
    $mailer->setFrom($SENDER, mb_encode_mimeheader($SENDER_NAME));
    $mailer->CharSet = $FROM_CHARSET;
    return $mailer;
}

function send($mailer, $to, $subject, $body) {
    global $TO_CHARSET ,$FROM_CHARSET;
    $mailer->addAddress($to);
    $mailer->Subject = mb_encode_mimeheader($subject);
    $mailer->Body = mb_convert_encoding($body, $TO_CHARSET, $FROM_CHARSET);
    $mailer->send();

    //送信先をリセット
    $mailer->ClearAddresses();
}

$mailer = create_mailer();

// 管理者へ送信
send($mailer, $to_admin_email, $to_admin_subject, $to_admin_body);

if (!empty($post_user_email)) {
    // ユーザーへ送信
    send($mailer, $post_user_email, $to_user_subject, $to_user_body);
}

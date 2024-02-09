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
$post_user_tel = $post['tel'];
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
$to_admin_email = 'oshigoto@freeandopen.co.jp';

// メール件名
$to_admin_subject = 'エントリー連絡';

// メール本文
$to_admin_body = <<<EOT

■ Name
{$post_user_name}

■ Tel
{$post_user_tel}

■ E-mail
{$post_user_email}

■ Message
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

function send($to, $subject, $message) {
    global $SENDER;

    // 送信元メールアドレス
    $from = $SENDER;

    // 送信元の名前
    $from_name = "株式会社Freeandopen";

    // 送信元のメールアドレスと名前を組み合わせて、Fromヘッダーを作成
    $from_header = "From: " . mb_encode_mimeheader($from_name) . " <" . $from . ">";

    // 送信するメールのエンコーディングを設定
    $encoding = "UTF-8";

    // メールのヘッダーを組み立てる
    $headers = $from_header . "\n"
             . "MIME-Version: 1.0" . "\n"
             . "Content-Type: text/plain; charset=" . $encoding . "\n"
             . "Content-Transfer-Encoding: 8bit";

    $param = "-f".$from;

    // メールを送信
    mb_send_mail($to, $subject, $message, $headers, $param);
}

// 管理者へ送信
send($to_admin_email, $to_admin_subject, $to_admin_body);

if (!empty($post_user_email)) {
    // ユーザーへ送信
    // send($post_user_email, $to_admin_subject, $to_admin_body);
}

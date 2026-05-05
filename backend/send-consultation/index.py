"""Отправка заявки на консультацию на email d-service.spb@mail.ru"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    try:
        body = json.loads(event.get('body', '{}'))
    except Exception:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Invalid JSON'})}

    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    service = body.get('service', 'Не указана').strip()
    comment = body.get('comment', '').strip()

    if not name or not phone:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Имя и телефон обязательны'}, ensure_ascii=False)}

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    from_email = 'd-service.spb@mail.ru'
    to_email = 'd-service.spb@mail.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка на консультацию от {name}'
    msg['From'] = from_email
    msg['To'] = to_email

    html = f"""
    <html><body style="font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px;">
      <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #1a3a6b; border-bottom: 2px solid #7ec8e3; padding-bottom: 10px;">Новая заявка с сайта D-Service</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 10px 0; color: #666; width: 140px;">Имя:</td><td style="padding: 10px 0; font-weight: bold; color: #333;">{name}</td></tr>
          <tr><td style="padding: 10px 0; color: #666;">Телефон:</td><td style="padding: 10px 0; font-weight: bold; color: #333;"><a href="tel:{phone}" style="color: #1a3a6b;">{phone}</a></td></tr>
          <tr><td style="padding: 10px 0; color: #666;">Услуга:</td><td style="padding: 10px 0; color: #333;">{service}</td></tr>
          <tr><td style="padding: 10px 0; color: #666; vertical-align: top;">Комментарий:</td><td style="padding: 10px 0; color: #333;">{comment if comment else '—'}</td></tr>
        </table>
        <p style="margin-top: 24px; color: #999; font-size: 13px;">Заявка получена через сайт D-Service IT technology</p>
      </div>
    </body></html>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'success': True, 'message': 'Заявка отправлена'})
    }
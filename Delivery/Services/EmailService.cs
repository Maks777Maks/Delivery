using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Delivery.Services
{
    public class EmailService
    {
        public async static void SendEmail(string email, string url)
        {
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("amerscan8@gmail.com");
            mail.To.Add(email);
            mail.Subject = $"Зміна паролю користувача з поштою {email}";
            mail.IsBodyHtml = true;
            mail.Body = $"Щоб змінити пароль, перейдіть за посиланням: {url}";
            SmtpClient client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("amerscan8@gmail.com", "qazwsxedc&2003"),
                EnableSsl = true
            };
            await client.SendMailAsync(mail);
        }
    }
}
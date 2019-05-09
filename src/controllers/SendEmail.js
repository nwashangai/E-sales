import sendGrid from "@sendgrid/mail";

require("dotenv").config();

class SendEmail {
	static async sendEmail(req, res) {
		const { order } = req.body;
		try {
			const template = SendEmail.orderTemplate(order);
			await SendEmail.send(template);
			res.status(200).json({
				success: true,
				message: "Order Sent"
			});
		} catch (error) {
			res.status(400).json({
				success: false,
				message: "Bad request"
			});
		}
	}

	static async sendInquire(req, res) {
		const { contact } = req.body;
		try {
			await SendEmail.inquiry(contact);
			res.status(200).json({
				success: true,
				message: "Order Sent"
			});
		} catch (error) {
			res.status(400).json({
				success: false,
				message: "Bad request"
			});
		}
	}

	static orderTemplate(order) {
		return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
     <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Demystifying Email Design</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <style>
        body {
          font-family: "Open Sans", sans-serif;
          line-height: 1.25;
        }

        table {
          border: 1px solid #ccc;
          border-collapse: collapse;
          margin: 0;
          padding: 0;
          width: 100%;
          table-layout: fixed;
        }

        table caption {
          font-size: 1.5em;
          margin: .5em 0 .75em;
        }

        table tr {
          background-color: #f8f8f8;
          border: 1px solid #ddd;
          padding: .35em;
        }

        table th,
        table td {
          padding: .625em;
          padding-left: 15px;
          text-align: left;
        }

        table th {
          font-size: .85em;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        @media screen and (max-width: 600px) {
          table {
            border: 0;
          }

          table caption {
            font-size: 1.3em;
          }

          table thead {
            border: none;
            clip: rect(0 0 0 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
          }

          table tr {
            border-bottom: 3px solid #ddd;
            display: block;
            margin-bottom: .625em;
          }

          table td {
            border-bottom: 1px solid #ddd;
            display: block;
            font-size: .8em;
            text-align: right;
          }

          table td::before {
            content: attr(data-label);
            float: left;
            font-weight: bold;
            text-transform: uppercase;
          }

          table td:last-child {
            border-bottom: 0;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0;">
      <table border="1" cellpadding="0" cellspacing="0" width="100%">
        <caption>Order Summary</caption>
        <tr class="bdr-none"><th class="bdr-none" colspan="1" border="0">Name</th>
        <td class="bdr-none" colspan="5">${order.name}</td></tr>
        <tr class="bdr-none"><th class="bdr-none" colspan="1" border="0">Phone</th>
        <td class="bdr-none" colspan="5">${order.phone}</td></tr>
        <tr class="bdr-none"><th class="bdr-none" colspan="1" border="0">Address</th>
        <td class="bdr-none" colspan="5">${order.address}</td></tr>
        <tr class="bdr-none"><th class="bdr-none" colspan="6"></th></tr>
        <tr><th>Name</th><th>Category</th><th>Color</th><th>Quantiy</th><th>Price</th><th>Sub-total</th></tr>
          ${order.items
						.map(
							element =>
								`<tr border="1">
              <td>${element.name}</td>
              <td>${element.category}</td>
              <td>${element.color}</td>
              <td>${element.quantity}</td>
              <td>₦ ${element.price}</td>
              <td>₦ ${element.SubTotal}</td>
              </tr>`
						)
						.join("")}
        <tr><th colspan="5">Total</th><th>₦ ${order.total}</th></tr>
        <tr><th colspan="6">Description</th></tr>
        <tr><td colspan="6" rowspan="6" style="height:200px;">${
					order.description
				}</td></tr>
      </table>
    </body>
    </html>`;
	}

	static async send(template) {
		sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
			to: process.env.RECIEVER_TO,
			from: process.env.SENDER_FROM,
			subject: "C-Planet",
			html: template
		};
		sendGrid.send(msg);
	}

	static async inquiry(data) {
		sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
			to: process.env.RECIEVER_TO,
			from: data.email,
			subject: "C-Planet",
			text: data.message
		};
		sendGrid.send(msg);
	}
}

export default SendEmail;

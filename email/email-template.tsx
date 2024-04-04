import React from "react"
import FooterEmail from "./footer-email"

function OrderConfirmationEmail() {
  return (
    <div
      style={{
        backgroundColor: "#faf9f8",
        margin: "0px",
        padding: "0px",
        paddingTop: "40px",
        border: "0",
        height: "100%",
        width: "100%",
        verticalAlign: "middle",
      }}
    >
      {/* Google Font Link */}
      <link
        href="https://fonts.googleapis.com/css?family=Nunito:400,700"
        rel="stylesheet"
        type="text/css"
      />

      {/* General Styles */}
      <style>
        {`
    * { font-family: 'Nunito', sans-serif; } 
  `}
      </style>

      <table
        style={{
          padding: "0",
          borderSpacing: "0",
          height: "100%",
          width: "100%",
        }}
      >
        <tbody>
          <tr style={{ border: "0", margin: "0", outline: "0", padding: "0" }}>
            <td
              style={{
                margin: "20px",
                textAlign: "center",
                verticalAlign: "top",
              }}
            >
              <div style={{ padding: "0 0 40px 0" }}>
                <a href={""}>
                  <img
                    className="max-width"
                    style={{
                      display: "block",
                      color: "#000000",
                      textDecoration: "none",
                      fontFamily: "Helvetica, arial, sans-serif",
                      fontSize: "16px",
                    }}
                    width="180"
                    alt=""
                    data-proportionally-constrained="true"
                    data-responsive="false"
                    src="http://cdn.mcauto-images-production.sendgrid.net/81fa98ad41cd060d/e7470c7c-072f-45a7-bcbc-9c255423a6b1/2342x904.png"
                    height="69"
                  />
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <div
              style={{
                fontFamily: "inherit",
                textAlign: "center",
                backgroundColor: "#FFFFFF",
                paddingTop: "20px",
                paddingBottom: "10px",
              }}
            >
              <span style={{ fontSize: "32px" }}>Reset your password</span>
            </div>
          </tr>
          <tr>
            <td>
              <div
                style={{
                  fontFamily: "inherit",
                  textAlign: "center",
                  backgroundColor: "#FFFFFF",
                  paddingTop: "20px",
                  paddingBottom: "10px",
                }}
              >
                <span style={{ fontSize: "18px" }}>
                  Hi {"firstName"} {"lastName"}, we&apos;ve received a password
                  reset request for your KHRT account.
                </span>
                <span style={{ fontSize: "18px", color: "#000000" }}>
                  &nbsp;
                </span>
              </div>
              <div
                style={{
                  fontFamily: "inherit",
                  backgroundColor: "#FFFFFF",
                  textAlign: "center",
                }}
              >
                <br />
              </div>
              <div
                style={{
                  fontFamily: "inherit",
                  backgroundColor: "#FFFFFF",
                  textAlign: "center",
                }}
              >
                <span style={{ color: "#423824", fontSize: "18px" }}>
                  <strong>
                    To proceed with the reset, click the button below:
                  </strong>
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td
              align="center"
              className="inner-td"
              style={{
                borderRadius: "6px",
                fontSize: "16px",
                textAlign: "center",
                backgroundColor: "inherit",
              }}
            >
              <div
                style={{
                  fontFamily: "inherit",
                  textAlign: "center",
                  backgroundColor: "#FFFFFF",
                  paddingTop: "20px",
                  paddingBottom: "10px",
                }}
              >
                <a
                  // href={`https://www.khrt.it/account?token=${token}&email=${email}`}
                  style={{
                    backgroundColor: "#CBBC9F",
                    border: "1px solid #CBBC9F",
                    borderRadius: "0px",
                    borderWidth: "1px",
                    color: "#000000",
                    display: "inline-block",
                    fontSize: "14px",
                    fontWeight: "normal",
                    letterSpacing: "0px",
                    lineHeight: "normal",
                    padding: "12px 40px 12px 40px",
                    textAlign: "center",
                    textDecoration: "none",
                    borderStyle: "solid",
                    fontFamily: "inherit",
                  }}
                  target="_blank"
                  rel="noopener noreferrer" // Added for security
                >
                  Reset Password now
                </a>
              </div>
            </td>
          </tr>
          <tr style={{ border: "0", margin: "0", outline: "0", padding: "0" }}>
            <td style={{ paddingTop: "40px" }}>
              <FooterEmail />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default OrderConfirmationEmail

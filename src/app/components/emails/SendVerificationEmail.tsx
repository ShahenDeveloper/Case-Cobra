import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

const EmailContent = ({
  link,
  type,
}: {
  link: string;
  type: "verification" | "reset";
}) => {
  const isVerification = type === "verification";

  return (
    <Html>
      <Head />
      <Preview>{isVerification ? "Confirm your email to get started" : "Reset your password"}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={message}>
            <Text
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#16a34a",
              }}
            >
              Case Cobra
            </Text>
            <Heading
              style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "#1f2937",
              }}
            >
              {isVerification
                ? "Confirm Your Email Address"
                : "Reset Your Password"}
            </Heading>
            <Text style={global.text}>
              {isVerification
                ? "Please confirm your email address to start using your account. Just click the button below:"
                : "Click the button below to reset your password:"}
            </Text>
            <Section style={global.defaultPadding}>
              <a href={link} style={global.button}>
                {isVerification ? "Confirm Email" : "Reset Password"}
              </a>
            </Section>

            <Text style={{ ...global.text, marginTop: 24 }}>
              {isVerification
                ? "If you didn't create this account, please ignore this email or contact support if you have any concerns."
                : "If you didn't request a password reset, please ignore this email."}
            </Text>
            <Hr style={global.hr} />
          </Section>

          <Section style={paddingY}>
            <Row>
              <Text
                style={{
                  ...footer.text,
                  paddingTop: 30,
                  paddingBottom: 30,
                }}
              >
                Need help? Reply to this email or contact our support team.
              </Text>
            </Row>

            <Row>
              <Text style={footer.text}>
                © CaseCobra, Inc. All Rights Reserved
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};

const paddingY = {
  paddingTop: "22px",
  paddingBottom: "22px",
};

const paragraph = {
  margin: "0",
  lineHeight: "2",
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  heading: {
    fontSize: "28px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
  } as React.CSSProperties,
  text: {
    ...paragraph,
    color: "#747474",
    fontWeight: "500",
  },
  button: {
    fontSize: "16px",
    textDecoration: "none",
    padding: "12px 24px",
    borderRadius: "4px",
    backgroundColor: "#16a34a",
    color: "#FFFFFF",
    display: "inline-block",
    textAlign: "center",
    fontWeight: 500,
  } as React.CSSProperties,
  hr: {
    borderColor: "#E5E5E5",
    margin: "20px 0",
  },
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "10px auto",
  width: "600px",
  maxWidth: "100%",
  border: "1px solid #E5E5E5",
  borderRadius: "8px",
  padding: "20px",
};

const message = {
  padding: "40px 74px",
  textAlign: "center",
} as React.CSSProperties;

const footer = {
  text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
  } as React.CSSProperties,
};

export default EmailContent;

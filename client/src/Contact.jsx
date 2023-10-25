import styled from "styled-components";


const Contact = ({email}) => {
  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  return <Wrapper>
    <h2 className="common-heading">Contact Page</h2>

    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.0767865525004!2d67.02805987458713!3d24.929453942494916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f8e3ed6d1bf%3A0x596fdcac6c11d6e3!2sQuaid%20e%20Azam%20Rangers%20School%20And%20College!5e0!3m2!1sen!2s!4v1695551285542!5m2!1sen!2s"
      width="100%"
      height="400"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"></iframe>

    <div className="container">
      <div className="contact-form">
        <form
          action="https://formspree.io/f/maygpvlz"
          method="POST"
          className="contact-inputs">
          <input
            type="text"
            placeholder="username"
            name="username"
            required
            autoComplete="off"
            value={email == "" ? "Login First" : JSON.stringify(email).slice(1,-11)}
          />

          <input 
            type="text"
            placeholder="email"
            name="Email"
            required
            autoComplete="off"
            value={email == "" ? "Login First" : email}
          />

          <textarea
           name="Message" 
           cols="30" 
           rows="10"
           required
           autoComplete="off"
           placeholder="Enter your message"
           ></textarea>
           
           <input type="submit" value="send" />
        </form>

      </div>
    </div>
  </Wrapper>;
};

export default Contact;

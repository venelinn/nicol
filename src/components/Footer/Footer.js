import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Section from '../Section/Section';
import Social from '../Header/Social';
import './Footer.scss';

const query = graphql`
  query footerData {
    data: contentfulFooter {
      copy
    }
  }
`;

const Footer = ({ theme }) => {
  const footer = useStaticQuery(query);
  return (
    <Section>
      <footer className="footer" data-theme={theme}>
        <div className="footer__copyright">
          © {new Date().getFullYear()}, {footer.data.copy}
        </div>
        <Social />
      </footer>
    </Section>
  );
};

export default Footer;

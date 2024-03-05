import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import SEO from '../components/Seo';
import Section from '../components/Section/Section';
import Contacts from '../components/Contacts/Contacts';
import Hero from '../components/Hero/Hero';

const AboutPage = props => {
  const about = props.data.about.edges[0].node;
  const heroImage = getImage(about.hero);
  return (
    <>
      <SEO
        title='Dimitar Tsvetkov'
        keywords={[ 'photography' ]}
      />

      <Section className="fixed">
        <div className="about">
          <div>
            <h2>{about.title}</h2>
            {about.desc.description && (
              <p>{about.desc.description}</p>
            )}
          </div>
          {/* <Hero title={about.hero.title} image={about.hero} /> */}
          <GatsbyImage image={heroImage} alt={about.hero.title} />
        </div>
        <Contacts />
      </Section>
    </>
  );
};

export default AboutPage;

AboutPage.propTypes = {
  data: PropTypes.object
};


export const pageQuery = graphql`
  query AboutPage {
    about: allContentfulPage (filter: {slug: {eq: "about"}, node_locale: { eq: "en-CA" }} )
    {
      ...AboutPageFragment
    }
  }
`;
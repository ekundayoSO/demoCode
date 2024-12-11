import { useEffect, useRef, useState } from 'react';
import "./mautic.css";

const MauticForm = () => {
  const formRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Define MauticDomain and MauticLang
    const setupScript = document.createElement('script');
    setupScript.textContent = `
      var MauticDomain = 'http://mautic-lando.lndo.site';
      var MauticLang = {
        'submittingMessage': "Please wait..."
      };
    `;
    document.head.appendChild(setupScript);

    // Load Mautic form script
    const script = document.createElement('script');
    script.src = 'http://mautic-lando.lndo.site/media/js/mautic-form.js?vafb3c98e';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (typeof window.MauticSDK !== 'undefined') {
        window.MauticSDK.onLoad();
      }
    };

    return () => {
      document.head.removeChild(setupScript);
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);

    fetch('http://mautic-lando.lndo.site/form/submit?formId=2', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: formData,
    })
      .then((response) => response.text())
      .then((htmlText) => {
        const match = htmlText.match(/parent\.postMessage\("(.+?)", '\*'\);/);
        if (match) {
          const jsonString = JSON.parse('"' + match[1].replace(/\\u/g, '\\u') + '"');
          return JSON.parse(jsonString);
        } else {
          throw new Error('Unable to parse response');
        }
      })
      .then((data) => {
        if (data.success) {
          setSuccessMessage(data.successMessage || 'Thank you! Your message has been sent successfully.');
          formRef.current.reset();
        } else {
          setSuccessMessage('There was an error submitting the form. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setSuccessMessage('There was an error submitting the form. Please try again.');
      });
  };

  return (
    <div>
      <div id="mauticform_wrapper_contactusform" className="mauticform_wrapper">
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          id="mauticform_contactusform"
          data-mautic-form="contactusform"
          encType="multipart/form-data"
        >
          <div
            id="mauticform_contactusform_f_name"
            className="mauticform-row mauticform-text mauticform-field-1 mauticform-required"
          >
            <label
              id="mauticform_label_contactusform_f_name"
              htmlFor="mauticform_input_contactusform_f_name"
              className="mauticform-label"
            >
              Name
            </label>
            <input
              id="mauticform_input_contactusform_f_name"
              name="mauticform[f_name]"
              placeholder="Enter your name"
              className="mauticform-input"
              type="text"
              required
            />
          </div>
          <div
            id="mauticform_contactusform_email"
            className="mauticform-row mauticform-email mauticform-field-2 mauticform-required"
          >
            <label
              id="mauticform_label_contactusform_email"
              htmlFor="mauticform_input_contactusform_email"
              className="mauticform-label"
            >
              Email
            </label>
            <input
              id="mauticform_input_contactusform_email"
              name="mauticform[email]"
              placeholder="Enter your email"
              className="mauticform-input"
              type="email"
              required
            />
          </div>
          <div
            id="mauticform_contactusform_company"
            className="mauticform-row mauticform-text mauticform-field-3"
          >
            <label
              id="mauticform_label_contactusform_company"
              htmlFor="mauticform_input_contactusform_company"
              className="mauticform-label"
            >
              Company
            </label>
            <input
              id="mauticform_input_contactusform_company"
              name="mauticform[company]"
              className="mauticform-input"
              type="text"
              required
            />
          </div>
          <div
            id="mauticform_contactusform_phone"
            className="mauticform-row mauticform-tel mauticform-field-4"
          >
            <label
              id="mauticform_label_contactusform_phone"
              htmlFor="mauticform_input_contactusform_phone"
              className="mauticform-label"
            >
              Phone
            </label>
            <input
              id="mauticform_input_contactusform_phone"
              name="mauticform[phone]"
              className="mauticform-input"
              type="tel"
              required
            />
          </div>
          <div
            id="mauticform_contactusform_f_message"
            className="mauticform-row mauticform-text mauticform-field-5"
          >
            <label
              id="mauticform_label_contactusform_f_message"
              htmlFor="mauticform_input_contactusform_f_message"
              className="mauticform-label"
            >
              Message
            </label>
            <textarea
              id="mauticform_input_contactusform_f_message"
              name="mauticform[f_message]"
              className="mauticform-textarea"
              required
            ></textarea>
          </div>
          <div
            id="mauticform_contactusform_policy"
            className="mauticform-row mauticform-checkboxgrp mauticform-field-6"
          >
            <div className="mauticform-checkboxgrp-row">
              <input
                id="mauticform_checkboxgrp_checkbox_policy_0"
                name="mauticform[policy][]"
                type="checkbox"
                value="I accept the use of my personal data in accordance with Druid's privacy statement."
                className="mauticform-checkboxgrp-checkbox"
                required
              />
              <label
                id="mauticform_checkboxgrp_label_policy_0"
                htmlFor="mauticform_checkboxgrp_checkbox_policy_0"
                className="mauticform-checkboxgrp-label"
              >
                I accept the use of my personal data in accordance with {`Druid's`}{' '}
                <span className="text-red-600">privacy statement.</span>
              </label>
            </div>
          </div>
          <div
            id="mauticform_contactusform_submit"
            className="mauticform-row mauticform-button-wrapper mauticform-field-7"
          >
            <button
              type="submit"
              name="mauticform[submit]"
              id="mauticform_input_contactusform_submit"
              className="mauticform-button btn btn-default"
            >
              Submit
            </button>
          </div>
          <input type="hidden" name="mauticform[formId]" id="mauticform_contactusform_id" value="2" />
          <input type="hidden" name="mauticform[return]" id="mauticform_contactusform_return" value="" />
          <input type="hidden" name="mauticform[formName]" id="mauticform_contactusform_name" value="contactusform" />
        </form>
      </div>
    </div>
  );
};

export default MauticForm;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";
import Icon from "../../../components/AppIcon";
import { contactAPI } from "services/api";

const HRContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // COMPANY SEARCH
  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm();

  const companyName = watch("companyName");

  const sendContactRequest = async (data) => {
    try {
      const req = await contactAPI.submit(data);
      return req;
    } catch (error) {
      throw error;
    }
  };

  // FETCH COMPANY AUTOCOMPLETE
  useEffect(() => {
    const controller = new AbortController();
    const fetchCompanies = async () => {
      if (!companyName || companyName.length < 2) {
        setCompanySuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://autocomplete.clearbit.com/v1/companies/suggest?query=${companyName}`,
          { signal: controller.signal }
        );

        setCompanySuggestions(response.data);
        setShowSuggestions(true);
      } catch (error) {
        if (!axios.isCancel(error)) console.log(error);
      }
    };

    const timer = setTimeout(fetchCompanies, 800); // Increased debounce delay for typing
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [companyName]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      console.log("HR Contact Data:", data);

      // API CALL HERE
      // await api.submitHRContact(data)

      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
        reset();
      }, 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-5">
        {/* HEADER */}
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Let's Connect
          </motion.h2>

          <p className="text-gray-500 mt-5 text-lg max-w-2xl mx-auto">
            HRs and recruiters can directly contact me for interviews,
            opportunities, freelance projects, or collaborations.
          </p>
        </div>

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
        >
          {/* SUCCESS MESSAGE */}
          {submitSuccess && (
            <div className="mb-6 bg-green-100 border border-green-300 text-green-700 p-4 rounded-xl flex items-center gap-3">
              <Icon name="CheckCircle" size={20} />
              Request sent successfully.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            {/* COMPANY NAME */}
            <div className="relative">
              <label className="block mb-2 font-semibold text-gray-700">
                Company Name
              </label>

              <input
                type="text"
                placeholder="Search company..."
                {...register("companyName", {
                  required: "Company name is required",
                })}
                className="w-full border-2 border-gray-200 focus:border-yellow-500 rounded-xl px-5 py-4 outline-none transition-all"
                onFocus={() => setShowSuggestions(true)}
              />

              {/* AUTOCOMPLETE */}
              {showSuggestions && companySuggestions.length > 0 && (
                <div className="absolute z-50 mt-2 w-full bg-white border rounded-2xl shadow-xl max-h-72 overflow-y-auto">
                  {companySuggestions.map((company, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setValue("companyName", company.name);
                        setShowSuggestions(false);
                      }}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-gray-100 cursor-pointer"
                    >
                      <img
                        src={company.logo || `https://ui-avatars.com/api/?name=${company.name}&background=random`}
                        alt={company.name}
                        className="w-12 h-12 rounded-xl border object-contain"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/48?text=Corp'; }}
                      />

                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {company.name}
                        </h4>

                        <p className="text-sm text-gray-500">
                          {company.domain}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {errors.companyName && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            {/* HR NAME */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                HR / Recruiter Name
              </label>

              <input
                type="text"
                placeholder="Enter recruiter name"
                {...register("hrName", {
                  required: "Recruiter name is required",
                })}
                className="w-full border-2 border-gray-200 focus:border-yellow-500 rounded-xl px-5 py-4 outline-none"
              />

              {errors.hrName && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors.hrName.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Official Email
              </label>

              <input
                type="email"
                placeholder="hr@company.com"
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full border-2 border-gray-200 focus:border-yellow-500 rounded-xl px-5 py-4 outline-none"
              />

              {errors.email && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Contact Number
              </label>

              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                {...register("phone")}
                className="w-full border-2 border-gray-200 focus:border-yellow-500 rounded-xl px-5 py-4 outline-none"
              />
            </div>

            {/* ROLE */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Job Role
              </label>

              <input
                type="text"
                placeholder="Frontend Developer / MERN Stack Developer"
                {...register("jobRole", {
                  required: "Job role is required",
                })}
                className="w-full border-2 border-gray-200 focus:border-yellow-500 rounded-xl px-5 py-4 outline-none"
              />

              {errors.jobRole && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors.jobRole.message}
                </p>
              )}
            </div>

            {/* INTERVIEW TYPE */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Opportunity Type
              </label>

              <select
                {...register("opportunityType", {
                  required: "Please select opportunity type",
                })}
                className="w-full border-2 border-gray-200 focus:border-yellow-500 rounded-xl px-5 py-4 outline-none"
              >
                <option value="">Select Opportunity</option>
                <option>Interview</option>
                <option>Internship</option>
                <option>Freelance Project</option>
                <option>Full-Time Job</option>
                <option>Part-Time Job</option>
              </select>
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Message
              </label>

              <textarea
                rows={6}
                placeholder="Write interview details or message..."
                {...register("message", {
                  required: "Message is required",
                })}
                className="w-full border-2 border-gray-200 focus:border-yellow-500 rounded-xl px-5 py-4 outline-none resize-none"
              />

              {errors.message && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              onClick={() => sendContactRequest(watch())}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Icon name="Send" size={20} />
                  Contact Me
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default HRContactForm;

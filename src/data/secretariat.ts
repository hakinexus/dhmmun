export interface SecretariatMember {
  name: string;
  role: string;
  img: string;
  delay: number;
  mt?: string;
  philosophy: string;
}

export const SECRETARIAT_MEMBERS: SecretariatMember[] = [
  {
    name: "Alexandra Sterling",
    role: "Secretary General",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrdpDcKuXTl5WTwB7MrQzN1flNQY7jy20EnTfwspvIdnhzrpzJiZe0HHF60BvbC8M1c20qqB4om06lS_3tHEO7_Emskgo4p1EThBKB2GXiuKRB-bN__55N9q9kxZGpRDeJP_mGvF99ncqFQ3eghvDpxetyElWwgzomn3r0r82CfqBYDUZKeG61vK-juJIyW1Gx8xhDmGSd4hHniJGCq7X04y_WZACQvnI8K9k0NJbSDZ9u0Z_6X3Djj2rVlzqXGBNZUGovChI8n9I",
    delay: 0,
    philosophy: "Diplomacy is the art of letting someone else have your way."
  },
  {
    name: "Julian Thorne",
    role: "Deputy Secretary General",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxFNFZ-VeBCYSJ331cON-tL4nCb4TXYrlY6XFcOyCWxfHezCfpxtYYbTHiatJh4eI3w1HbXxb7ZhDo3G1aIOPCpg09XXf69FnaMpQQ7SvU3lYTj2b8q-hDUJMA4ZNLn8DtvmxrhoTHu-ZPYNSpp5Z_PXIjJKP5fBqcp5W1lI_WXIeWOUJYHcqnLhop4qQC3BnqvGtRbvjJCEyNhv9VSf_mRRCqdfpZPNT_sCTVqQxQPu3sU6krskq--B5w0y_cgJV8sEtkkLPw7PU",
    delay: 0.1,
    mt: "lg:mt-12",
    philosophy: "Consensus is built in the silence between arguments."
  },
  {
    name: "Elena Rodriguez",
    role: "Director of Academics",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC57vgvG0dGko8QWij46kCjPJI53pKcwH9crA1_YnQb9t9-wEVkTldIC9Sr79sE3IMpDaBhw5FgApzZ7Xad0I_nlqlmcX-chWwBZFKD24UiNj2ESKbYYjxkoK2eKIJIUPmOTNRWym88vy1vx59hMdT3qDJLi1_nn-_o8WkZtL4kugDjob6LySOMGw6R4I4btIDhSKITc3ISc3VWx-71cqAXzp--4edDz0zbkcae9sKOVTWwzO0GRnhYIpHFRXvdG4bDwEP9ecqjFlM",
    delay: 0.2,
    philosophy: "True resolution requires historical empathy."
  },
  {
    name: "Marcus Chen",
    role: "Director of Logistics",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuADHIGTlbEO9acTtODdUz5jPUED0CsDfm_VBY-pOJM8Ucnqd2sHDejphzrNw3XI40Lrjku9e35NiRKVdsujhIk1mOc5RMeuL76ND8zsX1e0qEXIXSg2Pbd8IUO7O4UO1UfBjyKti9aHaN4S7YvQkTVH9ag0wChHxf67UXSE10AB-hUd4tQupoH4VwGTf5p0BFTHLpUjr0dveZZfnQjSnoQg_zgRbRsBNE2VpunseTz0QeZfeOgo0xE_r2We1NVqWGjo09Ll3FaPh1c",
    delay: 0.3,
    mt: "lg:mt-12",
    philosophy: "Precision in logistics enables freedom in discourse."
  },
  {
    name: "Sophia Vane",
    role: "Head of Press & Media",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBf5A2H3cOk81NiY5dY12jWa5VIEUeSnA5BKguxSvjOqIghIuN20I2kAxsR8zqPEqHP5SE1GkzrGgzygs9nM35mtw5sEOEE3Hp1kC9KwoSR3fMw-aEJTjFel6yv95Z8LGz3is5q5I1LHWjj3KOOFFIkU7wuOccgrzIEI3EXUO82ptzOp-yXfveFGCVGZ3oiJkbyxWmlj8DJEThQ3E11e7RUSNfoH33pXGyDtSh2UldQubmcNRIln7tf-FAN1-jdcm4hAMaj8mMSjj8",
    delay: 0.4,
    philosophy: "The narrative shapes the negotiation."
  },
  {
    name: "Oliver Bennett",
    role: "Conference Manager",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPDsLTthTa0tDY4S5ClJJpTplqTXriCv6rZgit6Q18utNFoR_W1qvTZcBjZ6rxNORxqleNPmiGcEHAtSSnGWrZR44xQyrGsN0D0d7DLytllxv7aCClB3kjWasFQtXywTSX9lr2uj1xaxDN8wB4P5jOsfu5LdFvFXM8Y_bnn-x0OiqpCUAUZe8dN9kLsN15dOIWyvVouAFbW5JwyG4rtdrn9MLYqfRfoZyDmRKHGWqqKLB3SKx4u0WrcllyALXO55cSunxiNzQd7CM",
    delay: 0.5,
    mt: "lg:mt-12",
    philosophy: "Structure is the invisible hand of progress."
  },
  {
    name: "Isabella Rossi",
    role: "Chief of Staff",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClxa7qkjMo3W3F213ppZewoW0sfHagIWrKi0mhjllZf83gsa9fsFiu0XxNqykRoFOrRipl7n-BoCKtq_cwvM6Daqp70vz1BzDf7aHAb4Ed88Uv93xeyWWwyh00COOTbZX5HUAIonuDMJhLMAvGE8WdBoncx1VhNDGhRfxu0a-1MqLZdrTcRjC-OGYlpoBoyLuGIlJWJrawoNeeOmY2IuVDcNSTCg1hu8lwMzz-MYJzWYH_hyBtAmIp5cpBR7kkL0TmKmVIJxIlSgw",
    delay: 0.6,
    philosophy: "Influence flows where friction is removed."
  },
  {
    name: "Xavier Wu",
    role: "Director of Technology",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxpXZtatX6QUxslRCkUk9CD6Rj3o_m3vvuUd__4rKlrxupiPEWObjfAxXEQznj0DUhvVVXORKP6ReMeTyC0FQC5nrVuvSv9AD6hWp7gF4b0yAl5lRMgWASmSD_HoIOQ1On6T86ZwIQQA4Ydj2fS_Qo6NknrtghLmhzsDx-kqHezvkj8_jJoQYo9L5HHUJ_UWAYYTJVBcDIBfVOkY-zKYqCyMVaFyZb96bo0XSmu_oGd4HVmp-h2XQ3ophEdkTLp0zuu5qBWX4h3HE",
    delay: 0.7,
    mt: "lg:mt-12",
    philosophy: "Transparency is the ultimate diplomatic protocol."
  }
];

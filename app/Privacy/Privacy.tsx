export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-100 via-blue-100 to-purple-100 py-[13%] px-6 text-center shadow-sm">
        <h1 className="text-6xl font-bold text-pink-500">Privacy & Policy</h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-base">
          Your privacy matters to us. This Privacy Policy explains how Calenara
          collects, uses, and protects your information while using our
          scheduling services.
        </p>
      </header>

      {/* Body Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto px-6 py-16 gap-10">
        {/* Sidebar */}
        <aside className="space-y-4 text-sm text-gray-700 sticky top-24 self-start hidden md:block">
          <nav className="space-y-2">
            {[
              "Information We Collect",
              "How We Use Information",
              "Sharing Your Information",
              "Data Security",
              "Your Rights",
              "Cookies",
              "Third-Party Links",
              "Data Retention",
              "Children's Privacy",
              "Policy Updates",
              "Contact Us",
            ].map((item, index) => (
              <a
                key={index}
                href={`#section-${index + 1}`}
                className="block text-gray-600 hover:text-blue-500 transition-colors"
              >
                {`${index + 1}. ${item}`}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="space-y-16 text-gray-800">
          <div className="text-sm text-gray-500 mb-6">
            <span className="font-medium text-blue-600">Last updated:</span>{" "}
            July 18, 2025
          </div>

          {/* Sections */}
          {[
            {
              id: 1,
              title: "Information We Collect",
              content: (
                <>
                  <p>
                    We collect various types of data to provide and improve our
                    Services.
                  </p>
                  <SubSection
                    title="1.1 Personal Information"
                    items={[
                      "Name",
                      "Email",
                      "Phone number",
                      "Time zone",
                      "Calendar availability",
                      "Payment details",
                    ]}
                  />
                  <SubSection
                    title="1.2 Usage Data"
                    items={[
                      "IP address",
                      "Browser type",
                      "Device info",
                      "Visited pages",
                      "Date & time",
                    ]}
                  />
                  <SubSection
                    title="1.3 Third-Party Integrations"
                    items={[
                      "OAuth (Google)",
                      "Nylas API",
                      "UploadThing",
                      "Zod",
                    ]}
                  />
                </>
              ),
            },
            {
              id: 2,
              title: "How We Use Information",
              content: (
                <BulletList
                  items={[
                    "Deliver and operate our services",
                    "Schedule meetings efficiently",
                    "Customize your experience",
                    "Develop and improve new features",
                    "Provide support",
                    "Comply with legal requirements",
                  ]}
                />
              ),
            },
            {
              id: 3,
              title: "Sharing Your Information",
              content: (
                <>
                  <p>We do not sell your data. It may be shared with:</p>
                  <BulletList
                    items={[
                      "Service providers (e.g., hosting, analytics)",
                      "Integration tools (with your permission)",
                      "Legal authorities if required",
                    ]}
                  />
                </>
              ),
            },
            {
              id: 4,
              title: "Data Security",
              content: (
                <p>
                  We apply security best practices to safeguard your data, but
                  no digital method is 100% secure. We continually review and
                  update our measures.
                </p>
              ),
            },
            {
              id: 5,
              title: "Your Rights",
              content: (
                <BulletList
                  items={[
                    "Access or correct your data",
                    "Delete or restrict usage",
                    "Withdraw consent at any time",
                    "Request a copy of your data",
                  ]}
                />
              ),
            },
            {
              id: 6,
              title: "Cookies",
              content: (
                <>
                  <p>We use cookies and similar technologies to:</p>
                  <BulletList
                    items={[
                      "Keep you logged in",
                      "Store preferences",
                      "Measure engagement",
                    ]}
                  />
                  <p className="mt-2">
                    You can manage cookies via your browser settings.
                  </p>
                </>
              ),
            },
            {
              id: 7,
              title: "Third-Party Links",
              content: (
                <p>
                  Our website may link to third-party services. We are not
                  responsible for their privacy practices. Review their policies
                  for details.
                </p>
              ),
            },
            {
              id: 8,
              title: "Data Retention",
              content: (
                <p>
                  We retain your information only for as long as necessary for
                  service delivery or as required by law.
                </p>
              ),
            },
            {
              id: 9,
              title: "Children's Privacy",
              content: (
                <p>
                  Calenara does not knowingly collect data from children under
                  13. If we learn we have done so, we will delete that data.
                </p>
              ),
            },
            {
              id: 10,
              title: "Policy Updates",
              content: (
                <p>
                  We may update this policy from time to time. Changes will be
                  reflected on this page, with a revised date.
                </p>
              ),
            },
            {
              id: 11,
              title: "Contact Us",
              content: (
                <>
                  <p>If you have questions, reach out to us:</p>
                  <p className="mt-2 text-blue-600">support@calenara.com</p>
                  <p className="text-blue-600">www.calenara.com</p>
                </>
              ),
            },
          ].map(({ id, title, content }) => (
            <section
              key={id}
              id={`section-${id}`}
              className="scroll-mt-20 space-y-4"
            >
              <h2 className="text-2xl font-semibold text-pink-500">{`${id}. ${title}`}</h2>
              <div className="text-base text-gray-700 space-y-2">{content}</div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}

// Reusable Bullet List
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside space-y-1">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}

// Reusable SubSection
function SubSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-2">
      <h3 className="text-blue-600 font-medium mb-1">{title}</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

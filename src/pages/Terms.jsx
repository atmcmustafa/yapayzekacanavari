import { Analytics } from "@vercel/analytics/react";
import HeaderIlkogretim from "../components/HeaderIlkogretim";
import Layer from "../components/Layer";
import { IoIosPaper } from "react-icons/io";

const Terms = () => {
  const data = [
    {
      title: "Gizlilik ve Kullanıcı Sözleşmesi",
      sections: [
        {
          subtitle: "Giriş",
          text: "prompt-engeneering-website.vercel.app ('Web Sitesi'), kullanıcılarımıza (siz) hizmetlerimizi sunarken, gizliliğinizi korumayı ve verilerinizi güvenli bir şekilde yönetmeyi taahhüt eder. Bu Gizlilik Sözleşmesi ve Kullanım Koşulları ('Sözleşme'), Web Sitemizi kullanımınızla ilgili haklarınızı, yükümlülüklerinizi ve gizlilik politikamızı açıklamaktadır. Web Sitemizi kullanarak, bu Sözleşmenin şartlarını kabul etmiş olursunuz.",
        },
        {
          subtitle: "Toplanan Bilgiler",
          text: "Web Sitemiz, kayıt bilgileri, demografik bilgiler ve kullanım verileri dahil ancak bunlarla sınırlı olmamak üzere çeşitli yollarla bilgi toplamaktadır.",
        },
        {
          subtitle: "Bilgilerin Kullanımı",
          text: "Toplanan bilgiler, hizmetlerimizin sunumu, iletişim ve güvenlik amaçları doğrultusunda kullanılabilir.",
        },
        {
          subtitle: "Bilgilerin Paylaşımı",
          text: "Kullanıcı bilgileriniz, yasal zorunluluklar veya şirket politikası gereği belirli durumlar dışında üçüncü taraflarla paylaşılmayacaktır.",
        },
        {
          subtitle: "Kullanıcı Hakları",
          text: "Erişim ve düzeltme, silme hakları gibi kullanıcı haklarınız hakkında bilgi içerir.",
        },

        {
          subtitle: "Sözleşme Değişiklikleri",
          text: "Bu Sözleşmede zaman zaman yapılacak değişiklikler ve kullanıcıların bu değişiklikleri düzenli olarak kontrol etmeleri gerektiği belirtilir.",
        },
        {
          subtitle: "Onay ve Kabul",
          text: "Web Sitemize kaydolarak ve hizmetlerimizi kullanarak, bu Gizlilik Sözleşmesi ve Kullanım Koşullarını kabul ettiğinizi beyan edersiniz.",
        },
        {
          subtitle: "İletişim",
          text: "Bu Sözleşme ile ilgili sorularınız için atmacamstf@outlook.com adresinden bize ulaşabilirsiniz.",
        },
      ],
    },
  ];

  return (
    <>
      <HeaderIlkogretim />
      <Layer />

      <div className="container mx-auto min-h-scren border mt-12 p-4">
        {data.map((item, index) => (
          <div className="" key={index}>
            <h1 className="mt-4 text-black">{item.title}</h1>
            {item.sections.map((item, index) => (
              <ul className="flex flex-col gap-1 my-3" key={index}>
                <h3 className="text-black">{item.subtitle}</h3>
                <li className="text-gray-600 text-sm">{item.text}</li>
              </ul>
            ))}
          </div>
        ))}
        <a href="/register">
          <button className="child-button-2 !bg-blue-600 !border-blue-400 !text-white">
            <span className="flex items-center gap-2">
              <IoIosPaper size={24} /> Kayıt Ol Sayfasına Geri Dön
            </span>
          </button>
        </a>
        <Analytics />
      </div>
    </>
  );
};

export default Terms;

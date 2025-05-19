import PageHeader from "../../components/PageHeader/PageHeader";
import ProductShell from "../../components/ProductShell/ProductShell";
import FAQSection from "../../components/FAQSection/FAQSection";
import PromoSection from "../../components/PromoBlock/PromoSection";
import MainMaterialList from "../../components/UploadedMaterial/MainMaterialList";

export default function Home() {
  return (
    <div className="">
      <MainMaterialList />
      <PromoSection page="home" />
      <PageHeader title="Популярные товары" />
      <ProductShell showOnMainPage={true} />
      <FAQSection />
    </div>
  );
}

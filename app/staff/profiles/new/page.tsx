import ProfileForm from "../ProfileForm";

export default function NewProfilePage() {
  return (
    <section className="pt-30 lg:pt-40 px-6 pb-32">
      <h1 className="font-rockwell text-4xl md:text-6xl text-athletic-white uppercase mb-8 text-center">
        New <span className="text-gold">Profile.</span>
      </h1>
      <ProfileForm />
    </section>
  );
}

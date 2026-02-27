import { useEffect, useRef, useState } from 'react';

const heroGallery = [
  {
    src: '/images/asus-proart-box.jpg',
    alt: 'Thùng màn hình Asus ProArt tại cửa hàng'
  }
];

const trustCards = [
  {
    title: 'Video test thật 1:1',
    description: 'Nhận video quay trực tiếp tình trạng màn, điểm chết, cổng kết nối trước khi quyết định.',
    cta: 'Nhận video test',
    href: 'https://zalo.me/0974378886'
  },
  {
    title: 'Tem bảo hành + serial minh bạch',
    description: 'Xác thực thông tin bảo hành đến 10/2028 để bạn mua yên tâm, không mơ hồ nguồn gốc.',
    cta: 'Xem ảnh bảo hành',
    href: 'https://zalo.me/0974378886'
  },
  {
    title: 'Giữ máy 30 phút miễn phí',
    description: 'Đặt giữ nhanh qua Zalo để không bỏ lỡ deal hiếm khi chỉ còn 1 chiếc tại kho Hà Nội.',
    cta: 'Đặt giữ máy',
    href: 'https://zalo.me/0974378886'
  }
];

const personaCards = [
  {
    role: 'Designer',
    value: 'Màu chuẩn để hạn chế sửa file nhiều lần.',
    detail: '100% sRGB/Rec.709 + Delta E thấp giúp bản in và preview lệch ít hơn.'
  },
  {
    role: 'Developer',
    value: 'Một dây Type-C cho cả hình ảnh và sạc.',
    detail: 'Setup gọn bàn làm việc, giảm rối dây và giữ workflow tập trung.'
  },
  {
    role: 'Editor',
    value: 'Lướt timeline mượt với 144Hz ổn định.',
    detail: 'Kéo timeline nhanh hơn, review shot và motion rõ hơn trên panel 2K.'
  }
];

const purchasePolicies = [
  'Cho kiểm tra ngoại quan và cổng kết nối khi nhận máy',
  'Hỗ trợ đổi máy nếu phát sinh lỗi điểm chết ngoài cam kết',
  'Ship nhanh nội thành, hẹn giờ linh hoạt theo lịch của bạn',
  'Hỗ trợ cân màu miễn phí trọn đời cho khách đã mua'
];

export default function App() {
  const [imageError, setImageError] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '' });
  const [submitState, setSubmitState] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const submitTimerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scrollToHashTarget = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const target = document.querySelector(hash);
      if (!target) return;

      const topBannerHeight = document.querySelector('[data-top-banner]')?.offsetHeight ?? 0;
      const headerHeight = document.querySelector('header')?.offsetHeight ?? 0;
      const offset = topBannerHeight + headerHeight + 18;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    };

    const timer = window.setTimeout(scrollToHashTarget, 200);
    window.addEventListener('hashchange', scrollToHashTarget);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('hashchange', scrollToHashTarget);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (submitTimerRef.current) {
        window.clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

  const handleLeadFieldChange = (event) => {
    const { name, value } = event.target;
    setLeadForm((previous) => ({ ...previous, [name]: value }));
    if (submitState === 'error') {
      setSubmitState('idle');
      setSubmitMessage('');
    }
  };

  const handleLeadSubmit = (event) => {
    event.preventDefault();

    const name = leadForm.name.trim();
    const phone = leadForm.phone.replace(/\s+/g, '');
    const phonePattern = /^(0|\+84)\d{8,10}$/;

    if (!name || !phone) {
      setSubmitState('error');
      setSubmitMessage('Vui lòng nhập đầy đủ tên và số điện thoại để nhận video test.');
      return;
    }

    if (!phonePattern.test(phone)) {
      setSubmitState('error');
      setSubmitMessage('Số điện thoại chưa hợp lệ. Hãy nhập theo định dạng 0xxxxxxxxx hoặc +84xxxxxxxxx.');
      return;
    }

    setSubmitState('loading');
    setSubmitMessage('Đang gửi yêu cầu. Shop sẽ gọi lại trong khoảng 5 phút.');

    if (submitTimerRef.current) {
      window.clearTimeout(submitTimerRef.current);
    }

    submitTimerRef.current = window.setTimeout(() => {
      setSubmitState('success');
      setSubmitMessage('Đã nhận thông tin. Bạn có thể nhắn Zalo ngay để nhận video test trước.');
      setLeadForm({ name: '', phone: '' });
    }, 900);
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Bỏ qua điều hướng
      </a>

      <div data-top-banner className="bg-brand-900 px-4 py-2 text-center text-xs font-bold uppercase tracking-widest text-white">
        Chỉ còn duy nhất 01 chiếc tại kho Hà Nội - Bảo hành đến 10/2028
      </div>

      <header className="glass sticky top-0 z-50 border-b border-brand-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 font-bold text-white">M</div>
            <div>
              <h2 className="font-heading text-lg font-extrabold leading-none">Monitor Hà Nội</h2>
              <p className="text-[10px] font-semibold uppercase text-slate-500">Uy tín - Chất lượng - Tận tâm</p>
            </div>
          </div>
          <nav className="hidden gap-6 text-sm font-semibold text-slate-600 md:flex" aria-label="Điều hướng chính">
            <a href="#specs" className="cursor-pointer transition hover:text-brand-500">
              Thông số
            </a>
            <a href="#compare" className="cursor-pointer transition hover:text-brand-500">
              So sánh
            </a>
            <a href="#reviews" className="cursor-pointer transition hover:text-brand-500">
              Đánh giá
            </a>
            <a href="#chinh-sach" className="cursor-pointer transition hover:text-brand-500">
              Chính sách
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:0974378886" className="hidden text-sm font-bold text-brand-600 sm:block">
              0974 378 886
            </a>
            <a
              href="https://zalo.me/0974378886"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer rounded-full bg-brand-500 px-5 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-brand-500/20 transition-all duration-200 hover:bg-brand-600"
            >
              Chốt Ngay
            </a>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="relative overflow-hidden pb-8 pt-12 md:pb-10">
          <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 opacity-30">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-brand-100 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
          </div>

          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2">
            <div className="reveal">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3 py-1 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-danger animate-ping" />
                <span className="text-xs font-bold text-danger">ĐANG CÓ 12 NGƯỜI QUAN TÂM</span>
              </div>

              <h1 className="gradient-text mb-6 font-heading text-4xl font-extrabold leading-[1.1] md:text-6xl">
                Asus ProArt PA278CGV <br />
                <span className="text-brand-500">27&quot; 2K 144Hz</span>
              </h1>

              <p className="mb-6 text-lg leading-relaxed text-slate-700">
                Màn hình đồ họa &quot;quốc dân&quot; tình trạng{' '}
                <span className="font-bold text-brand-900 underline decoration-brand-500">lướt 99% fullbox</span>. Giải pháp hoàn hảo cho
                Designer và Coder dùng Macbook/Laptop Type-C.
              </p>

              <div className="mb-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-brand-100 bg-white px-4 py-3 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Cổng kết nối</p>
                  <p className="mt-1 text-sm font-bold text-brand-900">Type-C 90W</p>
                </div>
                <div className="rounded-2xl border border-brand-100 bg-white px-4 py-3 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Bảo hành</p>
                  <p className="mt-1 text-sm font-bold text-brand-900">Đến 10/2028</p>
                </div>
                <div className="rounded-2xl border border-brand-100 bg-white px-4 py-3 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Hỗ trợ</p>
                  <p className="mt-1 text-sm font-bold text-brand-900">Cân màu trọn đời</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="https://zalo.me/0974378886"
                  target="_blank"
                  rel="noreferrer"
                  className="animate-pulse-soft flex-1 cursor-pointer rounded-2xl bg-accent px-8 py-4 text-center text-lg font-extrabold text-white shadow-xl shadow-accent/20 transition-all duration-200 hover:bg-orange-600"
                >
                  NHẬN VIDEO TEST TRONG 2 PHÚT
                </a>
                <a
                  href="#gia"
                  className="flex-1 cursor-pointer rounded-2xl border-2 border-brand-100 bg-white px-8 py-4 text-center font-bold text-brand-900 transition-all duration-200 hover:border-brand-500"
                >
                  Xem Báo Giá
                </a>
              </div>
              <p className="mt-4 text-center text-xs font-medium italic text-slate-500 sm:text-left">
                Tư vấn trực tiếp với kỹ thuật viên, không qua trung gian.
              </p>
            </div>

            <div className="reveal relative">
              <div className="relative z-10 rounded-[2rem] border border-brand-100 bg-white p-2 shadow-2xl">
                <div className="group relative aspect-video overflow-hidden rounded-[1.5rem] bg-slate-100">
                  {!imageError ? (
                    <img
                      src={heroGallery[0].src}
                      alt={heroGallery[0].alt}
                      className="h-full w-full object-cover"
                      loading="eager"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-center text-sm font-semibold text-slate-400">
                      Khu vực ảnh sản phẩm thật
                      <br />
                      (thêm ảnh vào public/images/asus-proart-box.jpg)
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
                    <span className="h-1.5 w-8 rounded-full bg-brand-500" />
                    <span className="h-1.5 w-8 rounded-full bg-slate-300" />
                    <span className="h-1.5 w-8 rounded-full bg-slate-300" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 rounded-2xl border border-brand-100 bg-white p-4 shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-slate-400">Tình trạng</p>
                  <p className="text-sm font-extrabold text-brand-900">Cam kết không điểm chết</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white pb-6 pt-8 md:pb-8 md:pt-10">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="reveal rounded-[2rem] border border-brand-100 bg-brand-50/70 p-6 md:p-8">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-heading text-2xl font-extrabold text-brand-900">Mua màn hình cũ nhưng vẫn an tâm như mới</h2>
                  <p className="mt-2 max-w-3xl text-sm text-slate-600">
                    Trọng tâm của shop là minh bạch tình trạng máy và đảm bảo trải nghiệm hậu mãi để bạn không phải đánh đổi rủi ro.
                  </p>
                </div>
                <a
                  href="tel:0974378886"
                  className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-bold text-brand-700 shadow-sm transition-colors duration-200 hover:bg-brand-100"
                >
                  Gọi kỹ thuật để xác minh nhanh
                </a>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {trustCards.map((card) => (
                  <article key={card.title} className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
                    <h3 className="font-heading text-lg font-bold text-brand-900">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.description}</p>
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-brand-600 transition-colors duration-200 hover:text-brand-700"
                    >
                      {card.cta}
                      <span aria-hidden="true">→</span>
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="specs" className="bg-white pb-16 pt-2 md:pb-20 md:pt-2">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="reveal mb-8 rounded-3xl border border-brand-100/70 bg-gradient-to-b from-brand-50/70 to-white px-6 py-6 text-center md:px-10 md:py-7">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-500">Lợi thế khi làm việc mỗi ngày</p>
              <h2 className="font-heading text-balance mb-4 text-3xl font-extrabold leading-tight tracking-tight text-brand-900 md:text-5xl">
                Tại sao nên chọn chiếc <span className="gradient-text">ProArt</span> này?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                Thông số sinh ra để phục vụ công việc chuyên nghiệp và giải trí mượt mà.
              </p>
              <div className="mx-auto mt-5 h-1 w-28 rounded-full bg-gradient-to-r from-brand-500 to-accent" />
            </div>

            <div className="reveal grid gap-6 md:grid-cols-4">
              <article className="rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-shadow duration-200 hover:shadow-md">
                <div className="mb-4 text-2xl font-black text-brand-500">2K</div>
                <h3 className="mb-2 text-lg font-bold text-brand-900">Độ phân giải 1440p</h3>
                <p className="text-sm text-slate-600">Sắc nét hơn 77% so với màn Full HD thông thường.</p>
              </article>
              <article className="rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-shadow duration-200 hover:shadow-md">
                <div className="mb-4 text-2xl font-black text-brand-500">144Hz</div>
                <h3 className="mb-2 text-lg font-bold text-brand-900">Tần số quét cao</h3>
                <p className="text-sm text-slate-600">Cuộn chuột cực mượt, không bóng ma khi làm video.</p>
              </article>
              <article className="rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-shadow duration-200 hover:shadow-md">
                <div className="mb-4 text-2xl font-black text-brand-500">ΔE &lt; 2</div>
                <h3 className="mb-2 text-lg font-bold text-brand-900">Độ chuẩn màu cao</h3>
                <p className="text-sm text-slate-600">Calman Verified, dùng thiết kế in ấn cực chuẩn.</p>
              </article>
              <article className="rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-shadow duration-200 hover:shadow-md">
                <div className="mb-4 text-2xl font-black text-brand-500">90W</div>
                <h3 className="mb-2 text-lg font-bold text-brand-900">Sạc USB-C</h3>
                <p className="text-sm text-slate-600">Cân tốt các dòng Macbook Pro 14&quot;/16&quot; chỉ với 1 sợi cáp.</p>
              </article>
            </div>

            <div className="reveal mt-10 grid gap-4 md:grid-cols-3">
              {personaCards.map((item) => (
                <article key={item.role} className="rounded-2xl border border-brand-100 bg-brand-50/50 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-500">{item.role}</p>
                  <h3 className="mt-2 text-lg font-bold text-brand-900">{item.value}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="compare" className="overflow-hidden bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="relative rounded-[3rem] bg-brand-900 p-8 md:p-12">
              <div className="absolute right-0 top-0 p-8 opacity-10">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="20" />
                </svg>
              </div>

              <h2 className="font-heading mb-8 text-center text-3xl font-extrabold text-white">So sánh với màn hình phổ thông cùng tầm giá</h2>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-sm text-slate-400">
                      <th className="py-4 font-medium italic">Đặc điểm</th>
                      <th className="rounded-t-lg bg-white/10 px-4 py-4 text-lg font-extrabold text-white">Asus ProArt PA278CGV</th>
                      <th className="py-4 font-medium italic">Màn 2K Gaming giá rẻ</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                      <td className="py-5 font-bold">Màu sắc thực tế</td>
                      <td className="bg-white/10 px-4 py-5 text-white">
                        <span className="font-semibold text-emerald-300">100% sRGB / Rec.709</span>
                      </td>
                      <td className="py-5">Thường bị sai lệch (lệch xanh/đỏ)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-5 font-bold">Cổng kết nối</td>
                      <td className="bg-white/10 px-4 py-5 text-white">USB-C 90W (xuất hình + sạc)</td>
                      <td className="py-5">Chỉ HDMI/DisplayPort (dây nhợ rườm rà)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-5 font-bold">Độ hoàn thiện chân đế</td>
                      <td className="bg-white/10 px-4 py-5 text-white">Xoay 90 độ, nâng hạ cực êm</td>
                      <td className="py-5">Thường lỏng lẻo hoặc cố định</td>
                    </tr>
                    <tr>
                      <td className="py-5 font-bold italic">Giá trị bán lại</td>
                      <td className="rounded-b-lg bg-amber-100 px-4 py-5 text-xl font-black text-brand-900">Giữ giá cực tốt</td>
                      <td className="py-5">Mất giá nhanh</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row">
              <div>
                <h2 className="font-heading mb-2 text-3xl font-extrabold">Phản hồi thực tế</h2>
                <p className="text-slate-500">Khách hàng đã nhận máy và cực kỳ hài lòng.</p>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-brand-100 bg-brand-50 px-4 py-2">
                <div className="-space-x-2 flex">
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-300" />
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-400" />
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-500" />
                </div>
                <span className="text-sm font-bold text-brand-600">+1.200 khách hàng tin tưởng</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <article className="relative rounded-[2rem] border border-slate-100 bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-500">HN</div>
                  <div>
                    <p className="text-sm font-bold">Hoàng Nam</p>
                    <p className="text-[10px] uppercase text-slate-400">Designer Freelance</p>
                  </div>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  &quot;Màn hình quá mới, mình test ΔE ra kết quả cực thấp. Shop tư vấn rất nhiệt tình, ship hỏa tốc trong 2h.&quot;
                </p>
                <div className="flex gap-1 text-xs text-accent" aria-label="5 sao">
                  ★★★★★
                </div>
              </article>

              <article className="rounded-[2rem] border border-brand-200 bg-brand-50 p-6 shadow-sm">
                <div className="mb-3 rounded-2xl rounded-tl-none bg-white p-3 text-sm shadow-sm">
                  Shop ơi nhận hàng rồi nhé, màn đẹp lắm, đóng gói kỹ dã man :))
                </div>
                <div className="mb-3 flex items-center gap-2 rounded-2xl rounded-tl-none bg-white p-3 text-sm shadow-sm">
                  <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  Ảnh thật setup đây nè shop
                </div>
                <div className="mb-2 flex aspect-video items-center justify-center rounded-xl bg-slate-200 text-[10px] text-slate-400">
                  [Ảnh setup thực tế của khách]
                </div>
                <p className="text-[10px] font-bold uppercase text-brand-500">Khách hàng Zalo - Hà Nội</p>
              </article>

              <article className="rounded-[2rem] border border-slate-100 bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-500">TQ</div>
                  <div>
                    <p className="text-sm font-bold">Trần Quang</p>
                    <p className="text-[10px] uppercase text-slate-400">Fullstack Developer</p>
                  </div>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  &quot;Dùng 1 dây Type-C cho Macbook tiện thật sự, sạc luôn 90W không cần dùng củ sạc rời của máy. Màn lướt mà như mới.&quot;
                </p>
                <div className="flex gap-1 text-xs text-accent" aria-label="5 sao">
                  ★★★★★
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="gia" className="relative overflow-hidden bg-slate-900 py-16 md:py-20 text-white">
          <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div className="reveal">
                <h2 className="font-heading mb-6 text-4xl font-extrabold">Sở hữu ngay với giá cực hời</h2>
                <div className="mb-4 flex items-baseline gap-4">
                  <span className="text-5xl font-black italic text-accent">7.500.000đ</span>
                  <span className="text-xl text-slate-500 line-through">11.990.000đ</span>
                </div>
                <div className="mb-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">✓</span>
                    <span className="text-slate-300">Tình trạng: 99% - Fullbox chính hãng</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">✓</span>
                    <span className="text-slate-300">Bảo hành hãng: Còn hơn 4 năm (10/2028)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">✓</span>
                    <span className="text-slate-300">Miễn phí ship bán kính 10km quanh Hà Nội</span>
                  </div>
                </div>

                <div id="chinh-sach" className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="mb-4 text-sm italic text-slate-300">
                    &quot;Mỗi lần nhập hàng lướt dòng này chỉ có 1-2 chiếc. Nếu bạn bỏ lỡ, có thể phải chờ 2-3 tháng nữa mới có deal tốt như vậy.&quot;
                  </p>
                  <ul className="mb-5 space-y-2 text-sm text-slate-300">
                    {purchasePolicies.map((policy) => (
                      <li key={policy} className="flex items-start gap-2">
                        <span className="mt-1 text-emerald-300">•</span>
                        <span>{policy}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-brand-400 bg-brand-500">
                      <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white">AD</div>
                    </div>
                    <div>
                      <p className="text-sm font-bold">Admin Monitor Giá Tốt</p>
                      <p className="text-xs uppercase text-slate-500">Đang Online Tư Vấn</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="reveal rounded-[3rem] bg-white p-8 text-brand-900 shadow-2xl">
                <h3 className="font-heading mb-2 text-2xl font-black">Tư vấn hỏa tốc</h3>
                <p className="mb-6 text-sm text-slate-500">Để lại thông tin, chúng tôi sẽ gọi lại ngay trong 5 phút.</p>

                <form className="space-y-4" aria-label="Form tư vấn nhanh" onSubmit={handleLeadSubmit}>
                  <div>
                    <label htmlFor="ten-khach" className="mb-1 ml-1 block text-xs font-bold uppercase text-slate-500">
                      Tên của bạn
                    </label>
                    <input
                      id="ten-khach"
                      name="name"
                      type="text"
                      value={leadForm.name}
                      onChange={handleLeadFieldChange}
                      placeholder="Ví dụ: Nguyễn Văn A"
                      autoComplete="name"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-5 py-4 outline-none transition-all duration-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="so-dien-thoai" className="mb-1 ml-1 block text-xs font-bold uppercase text-slate-500">
                      Số điện thoại / Zalo
                    </label>
                    <input
                      id="so-dien-thoai"
                      name="phone"
                      type="tel"
                      value={leadForm.phone}
                      onChange={handleLeadFieldChange}
                      placeholder="Nhập SĐT để nhận video test"
                      autoComplete="tel"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-5 py-4 outline-none transition-all duration-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitState === 'loading'}
                    className="w-full cursor-pointer rounded-2xl bg-brand-900 py-5 text-lg font-black text-white shadow-xl shadow-brand-900/20 transition-all duration-200 hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitState === 'loading' ? 'ĐANG GỬI THÔNG TIN...' : 'NHẬN TƯ VẤN VÀ XEM MÁY'}
                  </button>
                  <p className="text-center text-[11px] text-slate-500">Thông tin của bạn được bảo mật tuyệt đối 100%</p>
                  {submitMessage ? (
                    <p
                      role={submitState === 'error' ? 'alert' : 'status'}
                      aria-live={submitState === 'error' ? 'assertive' : 'polite'}
                      className={`rounded-xl border px-4 py-3 text-sm ${
                        submitState === 'error'
                          ? 'border-red-200 bg-red-50 text-red-600'
                          : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {submitMessage}
                    </p>
                  ) : null}

                  {submitState === 'success' ? (
                    <div className="grid gap-3 pt-1 sm:grid-cols-2">
                      <a
                        href="tel:0974378886"
                        className="cursor-pointer rounded-xl border border-brand-200 px-4 py-3 text-center text-sm font-bold text-brand-900 transition-colors duration-200 hover:bg-brand-50"
                      >
                        Gọi xác nhận ngay
                      </a>
                      <a
                        href="https://zalo.me/0974378886"
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-pointer rounded-xl bg-brand-500 px-4 py-3 text-center text-sm font-bold text-white transition-colors duration-200 hover:bg-brand-600"
                      >
                        Nhắn Zalo nhận video
                      </a>
                    </div>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-slate-900 py-10 text-center">
        <p className="text-sm text-slate-500">© 2024 Monitor Hà Nội - Uy tín tạo nên thương hiệu</p>
        <p className="mt-2 px-4 text-[10px] italic text-slate-600">
          Địa chỉ: Ngõ 1xx, Phố Vọng, Hai Bà Trưng, Hà Nội (Vui lòng gọi trước khi qua)
        </p>
      </footer>

      <div className="glass fixed bottom-0 left-0 right-0 z-[60] border-t border-brand-100 p-3 md:hidden">
        <div className="flex gap-2">
          <a
            href="tel:0974378886"
            className="flex-1 cursor-pointer rounded-2xl border border-brand-200 bg-white py-3 text-center text-sm font-bold text-brand-900 transition-colors duration-200 hover:bg-brand-50"
          >
            Gọi Điện
          </a>
          <a
            href="https://zalo.me/0974378886"
            target="_blank"
            rel="noreferrer"
            className="flex-[2] cursor-pointer rounded-2xl bg-accent py-3 text-center text-sm font-black text-white shadow-lg shadow-accent/30 transition-colors duration-200 hover:bg-orange-600"
          >
            Nhắn Zalo Ngay
          </a>
        </div>
      </div>
    </>
  );
}

import { useEffect } from 'react';
import './screen1.css';

const scarcityData = [
  { title: 'Anh Quân (Cầu Giấy) vừa gọi tư vấn', subtitle: 'Vừa xong', initial: 'AQ' },
  { title: 'Có 8 người đang xem sản phẩm này', subtitle: 'Trực tiếp', initial: '👁️' },
  { title: 'Minh Trang vừa nhắn tin qua Zalo', subtitle: '2 phút trước', initial: 'MT' },
  { title: 'Một khách từ Đà Nẵng vừa chốt cọc', subtitle: 'Chờ xác nhận', initial: '🚀' },
  { title: 'Hà Nam vừa nhắn tin hỏi về máy', subtitle: '4 phút trước', initial: 'HN' }
];

function upsertMetaByName(name, content) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function upsertMetaByProperty(property, content) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

export default function Screen1Page() {
  useEffect(() => {
    document.title = 'SĂN DEAL: Asus ProArt PA278CGV 27" 2K 144Hz | Đồ họa chuyên nghiệp';

    upsertMetaByName(
      'description',
      'Chỉ còn 01 chiếc Asus ProArt PA278CGV lướt 99%, bảo hành 2028. Chuẩn màu đồ họa, Type-C 90W. Giá cực tốt tại Hà Nội.'
    );
    upsertMetaByName('robots', 'index, follow');
    upsertMetaByProperty('og:type', 'product');
    upsertMetaByProperty('og:title', 'SĂN DEAL: Asus ProArt PA278CGV 27" 2K 144Hz | Đồ họa chuyên nghiệp');
    upsertMetaByProperty(
      'og:description',
      'Chỉ còn 01 chiếc Asus ProArt PA278CGV lướt 99%, bảo hành 2028. Chuẩn màu đồ họa, Type-C 90W. Giá cực tốt tại Hà Nội.'
    );
    upsertMetaByProperty('og:image', '/images/asus-proart-box.jpg');
    upsertMetaByProperty('og:locale', 'vi_VN');
    upsertMetaByName('twitter:card', 'summary_large_image');
    upsertMetaByName('twitter:title', 'SĂN DEAL: Asus ProArt PA278CGV 27" 2K 144Hz | Đồ họa chuyên nghiệp');
    upsertMetaByName(
      'twitter:description',
      'Chỉ còn 01 chiếc Asus ProArt PA278CGV lướt 99%, bảo hành 2028. Chuẩn màu đồ họa, Type-C 90W. Giá cực tốt tại Hà Nội.'
    );
    upsertMetaByName('twitter:image', '/images/asus-proart-box.jpg');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}/screen1`);

    let ldScript = document.getElementById('screen1-product-jsonld');
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.setAttribute('type', 'application/ld+json');
      ldScript.id = 'screen1-product-jsonld';
      document.head.appendChild(ldScript);
    }

    ldScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Asus ProArt PA278CGV 27 inch 2K 144Hz',
      brand: {
        '@type': 'Brand',
        name: 'ASUS'
      },
      description:
        'Chỉ còn 01 chiếc Asus ProArt PA278CGV lướt 99%, bảo hành 2028. Chuẩn màu đồ họa, Type-C 90W. Giá cực tốt tại Hà Nội.',
      image: ['/images/asus-proart-box.jpg'],
      offers: {
        '@type': 'Offer',
        priceCurrency: 'VND',
        price: '7500000',
        availability: 'https://schema.org/LimitedAvailability',
        itemCondition: 'https://schema.org/UsedCondition',
        seller: {
          '@type': 'Organization',
          name: 'Monitor Hà Nội'
        }
      }
    });
  }, []);

  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll('.screen1-root .reveal'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      reveals.forEach((element) => element.classList.add('active'));
      return undefined;
    }

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

    reveals.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scarcityToast = document.getElementById('scarcity-toast');
    const toastTitle = document.getElementById('toast-title');
    const toastSubtitle = document.getElementById('toast-subtitle');
    const avatarInitial = document.getElementById('avatar-initial');
    const pricingSection = document.getElementById('gia');

    if (!scarcityToast || !toastTitle || !toastSubtitle || !avatarInitial || !pricingSection) {
      return undefined;
    }

    const timeoutIds = [];
    const registerTimeout = (callback, delay) => {
      const timeoutId = window.setTimeout(callback, delay);
      timeoutIds.push(timeoutId);
      return timeoutId;
    };

    let currentScarcityIndex = 0;
    let isToastActive = false;
    let hasTriggered = false;

    const hideScarcityToast = () => {
      scarcityToast.classList.remove('toast-in');
      scarcityToast.classList.add('toast-out');

      registerTimeout(() => {
        scarcityToast.classList.add('hidden');
        isToastActive = false;
        registerTimeout(showScarcityToast, 12000);
      }, 600);
    };

    const showScarcityToast = () => {
      if (isToastActive) return;

      const data = scarcityData[currentScarcityIndex];
      toastTitle.textContent = data.title;
      toastSubtitle.textContent = data.subtitle;
      avatarInitial.textContent = data.initial;

      scarcityToast.classList.remove('hidden', 'toast-out');
      scarcityToast.classList.add('toast-in');
      isToastActive = true;

      registerTimeout(hideScarcityToast, 6000);
      currentScarcityIndex = (currentScarcityIndex + 1) % scarcityData.length;
    };

    const triggerScarcity = () => {
      if (hasTriggered) return;
      hasTriggered = true;
      showScarcityToast();
    };

    const pricingObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          triggerScarcity();
        }
      },
      { threshold: 0.1 }
    );

    pricingObserver.observe(pricingSection);
    registerTimeout(triggerScarcity, 20000);

    return () => {
      pricingObserver.disconnect();
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  return (
    <div className="screen1-root bg-[#fcfdfe] text-brand-900 antialiased">
      <div className="bg-brand-900 px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white md:text-xs">
        🚀 Cơ hội cuối: Chỉ còn 01 máy duy nhất - Bảo hành chính hãng 48 tháng
      </div>

      <header className="glass sticky top-0 z-50 border-b border-brand-100/50 transition-all duration-300">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-extrabold leading-none tracking-tight">Monitor Hà Nội</h2>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-brand-500">Premium Tech Outlet</p>
            </div>
          </div>

          <div className="hidden gap-8 text-sm font-bold text-slate-500 md:flex">
            <a href="#gallery" className="cursor-pointer transition hover:text-brand-600">
              Thư viện ảnh
            </a>
            <a href="#compare" className="cursor-pointer transition hover:text-brand-600">
              So sánh
            </a>
            <a href="#faq" className="cursor-pointer transition hover:text-brand-600">
              Hỏi đáp
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a href="tel:0974378886" className="hidden border-r border-brand-100 pr-4 text-sm font-extrabold text-brand-900 lg:block">
              0974 378 886
            </a>
            <a
              href="https://zalo.me/0974378886"
              target="_blank"
              rel="noreferrer"
              className="btn-clicky cursor-pointer rounded-xl bg-brand-500 px-6 py-2.5 text-sm font-extrabold text-white shadow-brand-600/20 shadow-clicky-brand transition-all hover:bg-brand-600"
            >
              Chốt Ngay
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden pb-12 pt-10 md:pt-16">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid items-start gap-12 lg:grid-cols-12">
              <div className="reveal lg:col-span-6">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-brand-600">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
                  </span>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider">Hàng hiếm: Lướt 99% Fullbox</span>
                </div>

                <h1 className="mb-6 text-4xl font-black leading-[1.1] tracking-tight text-brand-900 md:text-6xl">
                  Asus ProArt <span className="gradient-text">PA278CGV</span>
                </h1>

                <div className="mb-8 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-2xl border border-brand-100 bg-white px-4 py-2 shadow-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50">
                      <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-xs font-black uppercase text-slate-500">USB-C 90W</span>
                  </div>

                  <div className="flex items-center gap-2 rounded-2xl border border-brand-100 bg-white px-4 py-2 shadow-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50">
                      <svg className="h-5 w-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-black uppercase text-slate-500">Bảo hành 2028</span>
                  </div>
                </div>

                <p className="mb-8 max-w-xl text-lg font-medium leading-relaxed text-slate-600">
                  Sự lựa chọn tối ưu cho Designer chuyên nghiệp. Macbook Ready với chuẩn màu{' '}
                  <span className="font-bold italic text-brand-600">Calman Verified</span> và khả năng sạc ngược 90W.
                </p>

                <div className="mb-10 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="https://zalo.me/0974378886"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-clicky flex-[1.5] cursor-pointer rounded-2xl bg-[#f59e0b] px-8 py-4 text-center text-lg font-black text-white shadow-clicky transition-all hover:bg-amber-600"
                  >
                    XEM VIDEO TEST MÁY
                  </a>
                  <a
                    href="tel:0974378886"
                    className="btn-clicky flex-1 cursor-pointer rounded-2xl border-2 border-brand-100 bg-white px-8 py-4 text-center text-lg font-bold text-brand-900 transition-all hover:border-brand-500"
                  >
                    Gọi Tư Vấn
                  </a>
                </div>
              </div>

              <div id="gallery" className="reveal lg:col-span-6">
                <div className="grid h-[450px] grid-cols-4 grid-rows-4 gap-3">
                  <div className="group relative col-span-4 row-span-3 overflow-hidden rounded-3xl border border-brand-100 bg-slate-100 shadow-premium">
                    <div className="absolute inset-0 flex items-center justify-center bg-white px-10 text-center text-xs italic text-slate-400">
                      <span className="sr-only">Ảnh thực tế tại kho</span>
                    </div>
                    <div className="absolute left-4 top-4 rounded-full bg-brand-900/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
                      Ảnh thực tế tại kho
                    </div>
                  </div>

                  <div className="group relative col-span-1 row-span-1 overflow-hidden rounded-2xl border border-brand-50 bg-white">
                    <div className="absolute inset-0 flex items-center justify-center text-[8px] text-slate-300">[Tem Serial]</div>
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-900/10 opacity-0 transition group-hover:opacity-100">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="relative col-span-1 row-span-1 overflow-hidden rounded-2xl border border-brand-50 bg-white">
                    <div className="absolute inset-0 flex items-center justify-center text-center text-[8px] uppercase text-slate-300">[Type-C 90W]</div>
                  </div>
                  <div className="relative col-span-1 row-span-1 overflow-hidden rounded-2xl border border-brand-50 bg-white">
                    <div className="absolute inset-0 flex items-center justify-center text-[8px] text-slate-300">[Cân màu]</div>
                  </div>
                  <div className="relative col-span-1 row-span-1 overflow-hidden rounded-2xl border border-brand-50 bg-white">
                    <div className="absolute inset-0 flex items-center justify-center text-[8px] text-slate-300">[Fullbox]</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="compare" className="bg-brand-50/50 py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="reveal mb-12 text-center">
              <h2 className="mb-4 text-3xl font-black tracking-tight md:text-4xl">Lựa chọn thông minh cho công việc</h2>
              <p className="font-medium text-slate-500">Đừng chỉ nhìn vào giá, hãy nhìn vào giá trị lâu dài.</p>
            </div>

            <div className="reveal grid items-stretch gap-8 md:grid-cols-2">
              <div className="relative flex flex-col overflow-hidden rounded-[2.5rem] border-2 border-brand-500 bg-white p-8 shadow-premium">
                <div className="absolute right-0 top-0 rounded-bl-3xl bg-brand-500 px-6 py-2 text-[10px] font-black uppercase tracking-widest text-white">
                  Đề xuất tốt nhất
                </div>
                <div className="mb-6">
                  <h3 className="mb-1 text-2xl font-black text-brand-900">Asus ProArt PA278CGV</h3>
                  <p className="text-sm font-bold uppercase text-brand-500">Dòng đồ họa cao cấp (Lướt)</p>
                </div>
                <ul className="mb-8 flex-1 space-y-5">
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-100">
                      <svg className="h-4 w-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-semibold text-slate-700">Màu chuẩn xác ∆E &lt; 2, 100% sRGB (Đồ họa thật)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-100">
                      <svg className="h-4 w-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-semibold text-slate-700">Cổng USB-C 90W xuất hình & sạc (Gọn bàn)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-100">
                      <svg className="h-4 w-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-semibold text-slate-700">Bảo hành dài đến 2028 (Yên tâm tuyệt đối)</span>
                  </li>
                </ul>
                <div className="border-t border-slate-100 pt-6">
                  <p className="text-3xl font-black italic text-brand-900">7.500.000đ</p>
                </div>
              </div>

              <div className="flex flex-col rounded-[2.5rem] border border-slate-200 bg-slate-100/50 p-8 opacity-80">
                <div className="mb-6">
                  <h3 className="mb-1 text-2xl font-bold italic text-slate-500">Màn Gaming/Phổ thông</h3>
                  <p className="text-sm font-bold uppercase text-slate-400">Cùng tầm giá (Mới)</p>
                </div>
                <ul className="mb-8 flex-1 space-y-5">
                  <li className="flex items-start gap-3 italic text-slate-500">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-200">
                      <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Màu sắc rực rỡ nịnh mắt nhưng sai lệch cao</span>
                  </li>
                  <li className="flex items-start gap-3 italic text-slate-500">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-200">
                      <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Không có USB-C hoặc sạc công suất thấp</span>
                  </li>
                  <li className="flex items-start gap-3 italic text-slate-500">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-200">
                      <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Hoàn thiện nhựa, ọp ẹp, ít tính năng đồ họa</span>
                  </li>
                </ul>
                <div className="border-t border-slate-200 pt-6">
                  <p className="text-2xl font-bold italic text-slate-400">~7-8 triệu</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white py-20">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <div className="reveal mb-12 text-center">
              <h2 className="mb-4 text-3xl font-black italic tracking-tight">Giải đáp thắc mắc</h2>
              <p className="font-medium text-slate-500">Tất cả những gì bạn cần biết trước khi sở hữu</p>
            </div>

            <div className="reveal space-y-4">
              <details className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-slate-50" open>
                <summary className="flex cursor-pointer list-none items-center justify-between p-6 focus:outline-none">
                  <span className="font-black text-brand-900">Máy có thực sự chuẩn màu để làm đồ họa?</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="h-6 w-6 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="border-t border-slate-100 px-6 pb-6 pt-4 text-sm leading-relaxed text-slate-600">
                  Dòng ProArt của Asus nổi tiếng với độ chuẩn màu ∆E &lt; 2. Đặc biệt chiếc này đã được chúng tôi Calman Verified thực tế,
                  đảm bảo sai lệch màu thấp nhất, phù hợp cho in ấn và thiết kế chuyên nghiệp.
                </div>
              </details>

              <details className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-slate-50">
                <summary className="flex cursor-pointer list-none items-center justify-between p-6 focus:outline-none">
                  <span className="font-black text-brand-900">Nếu phát hiện điểm chết khi nhận hàng thì sao?</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="h-6 w-6 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="border-t border-slate-100 px-6 pb-6 pt-4 text-sm leading-relaxed text-slate-600">
                  Chúng tôi cam kết 100% không điểm chết. Trước khi gửi, shop sẽ quay video test chi tiết và gửi qua Zalo cho bạn xác nhận.
                  Nếu khi nhận hàng có lỗi vật lý, chúng tôi hỗ trợ đổi mới hoặc hoàn tiền ngay lập tức.
                </div>
              </details>

              <details className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-slate-50">
                <summary className="flex cursor-pointer list-none items-center justify-between p-6 focus:outline-none">
                  <span className="font-black text-brand-900">Bảo hành 2028 là bảo hành ở đâu?</span>
                  <span className="transition group-open:rotate-180">
                    <svg className="h-6 w-6 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="border-t border-slate-100 px-6 pb-6 pt-4 text-sm leading-relaxed text-slate-600">
                  Đây là bảo hành chính hãng của Asus Việt Nam tại tất cả các trung tâm bảo hành toàn quốc. Máy còn đầy đủ thông tin trên
                  hệ thống, bạn chỉ cần mang máy đến bất kỳ trung tâm Asus nào là sẽ được hỗ trợ.
                </div>
              </details>
            </div>
          </div>
        </section>

        <section id="gia" className="relative overflow-hidden bg-brand-900 py-20">
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 L100 0 L100 100 Z" fill="white" />
            </svg>
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white md:px-6">
            <div className="reveal">
              <h2 className="screen1-vn-heading mb-6 text-4xl font-black italic leading-tight md:text-5xl">
                Deal hời cho Designer chuyên nghiệp
              </h2>
              <div className="mx-auto max-w-2xl rounded-[3rem] border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-slate-300">Giá chốt nhanh hôm nay</p>
                <p className="mb-6 text-6xl font-black italic text-[#f59e0b] md:text-7xl">7.500k</p>
                <div className="mb-10 flex flex-wrap justify-center gap-6 text-sm font-semibold">
                  <span className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    Fullbox nguyên thùng
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    Free ship nội thành HN
                  </span>
                </div>
                <a
                  href="https://zalo.me/0974378886"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-clicky inline-block w-full cursor-pointer rounded-2xl bg-[#f59e0b] py-5 text-xl font-black text-white shadow-clicky transition-all hover:bg-amber-600"
                >
                  LIÊN HỆ CHỐT NGAY QUA ZALO
                </a>
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-widest text-slate-400">Thời gian ưu đãi có hạn do số lượng máy chỉ có 01</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-slate-950 pb-32 py-12 text-center md:pb-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">Monitor Hà Nội - Uy tín tạo niềm tin</p>
          <p className="mb-8 max-w-md text-[11px] italic text-slate-600">
            Địa chỉ kho: Phố Vọng, Hai Bà Trưng, Hà Nội. Vui lòng gọi điện trước khi qua xem máy để được tiếp đón chu đáo nhất.
          </p>
          <div className="mb-8 h-px w-20 bg-brand-500/20" />
          <p className="text-[10px] text-slate-700">© 2024 Monitor Hà Nội. Design by TechSales Team.</p>
        </div>
      </footer>

      <div id="scarcity-toast" className="fixed bottom-28 left-4 z-[70] hidden w-full max-w-[280px] md:bottom-10 md:left-10 md:max-w-xs">
        <div className="glass flex items-center gap-3 rounded-full border border-brand-100 p-4 shadow-toast">
          <div className="relative flex-shrink-0">
            <div
              id="toast-avatar"
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-brand-200 text-xs font-bold uppercase text-brand-600"
            >
              <span id="avatar-initial">HN</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 animate-pulse rounded-full border-2 border-white bg-green-500" />
          </div>
          <div className="overflow-hidden">
            <p id="toast-title" className="truncate text-xs font-black leading-tight tracking-tight text-brand-900">
              Hà Nam vừa nhắn tin hỏi máy
            </p>
            <p id="toast-subtitle" className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              Cách đây 4 phút
            </p>
          </div>
        </div>
      </div>

      <div className="glass fixed bottom-0 left-0 right-0 z-[60] border-t border-brand-100 p-4 lg:hidden">
        <div className="flex gap-3">
          <a
            href="tel:0974378886"
            className="flex-1 cursor-pointer rounded-2xl border-2 border-brand-100 bg-white py-3.5 text-center text-sm font-black text-brand-900 min-h-[44px]"
          >
            GỌI ĐIỆN
          </a>
          <a
            href="https://zalo.me/0974378886"
            target="_blank"
            rel="noreferrer"
            className="flex-[2] cursor-pointer rounded-2xl bg-brand-500 py-3.5 text-center text-sm font-black text-white shadow-clicky-brand min-h-[44px]"
          >
            NHẮN ZALO CHỐT DEAL
          </a>
        </div>
      </div>
    </div>
  );
}

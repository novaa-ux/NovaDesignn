// --- 1. نظام الإشعارات المتقدم (Toast System) ---
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // أيقونة حسب النوع
    let icon = type === 'success' ? '<i class="fas fa-check-circle" style="color:#8a2be2"></i>' : '<i class="fas fa-info-circle"></i>';
    
    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    // إخفاء وحذف التوست بعد 3 ثواني
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 400); // الانتظار حتى انتهاء الأنيميشن
    }, 3000);
}

// --- 2. فلترة معرض الأعمال (Portfolio Filter) ---
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // إزالة الأكتيف من كل الأزرار
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.style.display = 'none', 300); // توافق مع وقت الـ CSS transition
            }
        });
    });
});

// --- 3. حاسبة التكلفة الذكية (Live Price Calculator) ---
const basePriceSelect = document.getElementById('projectType');
const featureCheckboxes = document.querySelectorAll('.feature-calc');
const livePriceDisplay = document.getElementById('livePrice');

function calculateTotal() {
    let total = parseInt(basePriceSelect.value);
    
    featureCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            total += parseInt(checkbox.value);
        }
    });

    // أنيميشن للأرقام
    animateValue(livePriceDisplay, parseInt(livePriceDisplay.innerText), total, 300);
}

// تشغيل الحساب عند أي تغيير
basePriceSelect.addEventListener('change', calculateTotal);
featureCheckboxes.forEach(cb => cb.addEventListener('change', calculateTotal));

// دالة لمحاكاة الـ API Submission
function submitProject() {
    // 1. جلب نوع المشروع الأساسي والنص المكتوب جواه
    const basePriceSelect = document.getElementById('projectType');
    const selectedProjectText = basePriceSelect.options[basePriceSelect.selectedIndex].text;
    
    // 2. جلب السعر الإجمالي النهائي
    const total = document.getElementById('livePrice').innerText;
    
    // 3. جلب الميزات الإضافية التي تم اختيارها فقط
    let selectedFeatures = [];
    const featureCheckboxes = document.querySelectorAll('.feature-calc');
    
    featureCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            // جلب النص المصاحب للاختيار وتنظيفه من المسافات الزائدة
            const labelText = checkbox.parentElement.textContent.trim();
            selectedFeatures.push(labelText);
        }
    });

    // 4. بناء نص الرسالة بشكل منظم وفخم يلوق بـ NOVA (مع استخدام مارك داون الواتساب للمظهر الجريء)
    let message = `🔥 *طلب مشروع جديد من منصة NOVA* 🔥\n\n`;
    message += `▪️ *الخدمة الأساسية:* ${selectedProjectText}\n`;
    
    if (selectedFeatures.length > 0) {
        message += `▪️ *الميزات الإضافية المطلوبة:* \n`;
        selectedFeatures.forEach(feature => {
            message += `   - ${feature}\n`;
        });
    } else {
        message += `▪️ *الميزات الإضافية:* لا توجد ميزات إضافية\n`;
    }
    
    message += `\n💰 *إجمالي التكلفة التقديرية:* ${total} EGP\n\n`;
    message += `جاهز لبدء العمل ومناقشة تفاصيل التنفيذ! 🚀`;

    // 5. تشفير الرسالة برمجياً عشان المتصفح والروابط يفهموا الحروف العربي والرموز بشكل صحيح
    const encodedMessage = encodeURIComponent(message);
    
    // ⚠️ خطوة مهمة: اكتب رقم الواتساب بتاعك هنا بكود الدولة (امسح الرقم ده وحط رقمك بدون أصفار في الأول أو علامة +)
    const whatsappNumber = "201012345678"; 
    
    // 6. فتح شات الواتساب في صفحة جديدة بالطلب الجاهز
    window.open(`https://wa.me/${201111088069}?text=${encodedMessage}`, '_blank');
    
    // إشعار منبثق سريع في الموقع لتنبيه العميل
    showToast('جاري تحويلك للواتساب لإرسال تفاصيل طلبك...', 'success');
}


// دالة لعمل أنيميشن للعداد المالي
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
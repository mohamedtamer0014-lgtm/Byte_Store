// catr.js - robust cart using localStorage + event delegation

(function(){
  const STORAGE_KEY = "cart";

  // -- helpers --
  function readCart() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      console.error("خطأ في قراءة الlocalStorage:", e);
      return [];
    }
  }

  function writeCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  function addProduct(product) {
    const cart = readCart();
    cart.push(product);
    writeCart(cart);
    // للتجربة نعمل console.log بدل alert علشان ميمزعش الاختبار
    console.log("تمت الإضافة للسلة:", product);
  }

  function removeProductByIndex(index) {
    const cart = readCart();
    if (index < 0 || index >= cart.length) return;
    cart.splice(index, 1);
    writeCart(cart);
    renderCart(); // حدث العرض لو احنا في صفحة السلة
  }

  // -- event delegation for add buttons --
  document.addEventListener('click', function(e) {
    const addBtn = e.target.closest && e.target.closest('.add-btn');
    if (addBtn) {
      // Read data attributes
      const name = addBtn.dataset.name || "منتج";
      const price = parseFloat(addBtn.dataset.price) || 0;
      const img = addBtn.dataset.img || "";

      addProduct({ name, price, img });

      // feedback للمستخدم: ممكن تغيرها حسب اللي تحبه
      // لو عايز alert بدل console.log ازل التعليق
      // alert("تمت الإضافة إلى السلة ✔");
      return;
    }

    // حذف من السلة: زرار يحمل data-remove-index
    const removeBtn = e.target.closest && e.target.closest('[data-remove-index]');
    if (removeBtn) {
      const idx = parseInt(removeBtn.dataset.removeIndex, 10);
      removeProductByIndex(idx);
      return;
    }
  });

  // -- Render cart (for basket.html) --
  function renderCart() {
    const container = document.getElementById('cart-items');
    const summaryEl = document.getElementById('cart-summary');

    if (!container) return; // مش في صفحة السلة

    const cart = readCart();
    container.innerHTML = '';

    if (cart.length === 0) {
      container.innerHTML = '<p>السلة فارغة</p>';
      if (summaryEl) summaryEl.innerHTML = '';
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      total += Number(item.price || 0);

      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
      itemDiv.style.marginBottom = '12px';

      itemDiv.innerHTML = `
        <img src="${item.img || ''}" width="80" style="vertical-align:middle;margin-right:10px;">
        <strong>${item.name}</strong>
        <div>السعر: ${item.price} جنيه</div>
        <button data-remove-index="${index}">حذف</button>
      `;

      container.appendChild(itemDiv);
      container.appendChild(document.createElement('hr'));
    });

    if (summaryEl) {
      summaryEl.innerHTML = `<strong>الإجمالي: ${total} جنيه</strong>`;
    }
  }

  // expose remove function to window (in case you want to call it)
  window.removeItem = function(index) {
    removeProductByIndex(index);
  };

  // Render on load (useful when basket.html يحمّل)
  document.addEventListener('DOMContentLoaded', function(){
    renderCart();
    console.log("cart initialized, items:", readCart());
  });

})();

// BAGIAN 1: JAVASCRIPT MURNI (VANILLA JS)
// Struktur data, logika pengolahan, & render DOM native

// Data dummy memori
let airaMemories = [
  {
    id: "MEM-01",
    category: "Identitas",
    fact: "Nama pengguna adalah Kaisar.",
    priority: "Utama",
    createdAt: "2026-10-11 14:00"
  },
  {
    id: "MEM-02",
    category: "Minat",
    fact: "Menyukai serial detektif dan membaca komik.",
    priority: "Sedang",
    createdAt: "2026-10-11 14:05"
  },
  {
    id: "MEM-03",
    category: "Kuliah",
    fact: "Sedang mengerjakan tugas praktikum pemrograman web Telkom University.",
    priority: "Penting",
    createdAt: "2026-10-11 14:10"
  }
];

// Data respon chat AIRA
const airaResponses = {
  greetings: [
    "Halo juga! Senang bisa ngobrol lagi denganmu hari ini.",
    "Hai Kaisar! Ada yang bisa AIRA bantu untuk sesi belajarmu?",
    "Halo! Aku selalu siap menemanimu di sini."
  ],
  tasks: [
    "Semangat untuk tugas praktikumnya! Jangan lupa istirahat sejenak dan minum air ya.",
    "Wah, progres web programming kamu makin keren! Mau diskusikan bagian apa sekarang?",
    "Tugas yang dikerjakan bertahap pasti selesai dengan baik. Aku dukung dari panggung ini!"
  ],
  relax: [
    "Santai sejenak yuk. Mungkin mendengarkan musik santai bisa bikin pikiran lebih segar.",
    "Kalau sudah lelah ngoding, istirahatkan matamu sebentar ya, Kaisar."
  ],
  defaultReplies: [
    "Menarik sekali! Ceritakan lebih banyak tentang itu.",
    "AIRA mengerti. Fakta dan percakapan ini akan selalu kuingat dalam memori.",
    "Terima kasih sudah berbagi! Aku senang mendengarnya."
  ]
};

// Hitung statistik memori
function calculateMemoryStats(memories) {
  let stats = {
    total: memories.length,
    utama: 0,
    penting: 0,
    sedang: 0
  };

  memories.forEach(function (item) {
    if (item.priority === "Utama") {
      stats.utama++;
    } else if (item.priority === "Penting") {
      stats.penting++;
    } else {
      stats.sedang++;
    }
  });

  return stats;
}

// Filter memori berdasarkan kategori
function filterMemoriesByCategory(memories, category) {
  if (!category || category === "all") {
    return memories;
  }
  return memories.filter(function (item) {
    return item.category.toLowerCase() === category.toLowerCase();
  });
}

// Balasan chat otomatis AIRA
function generateCompanionReply(userMessage) {
  const text = userMessage.toLowerCase();

  if (text.includes("halo") || text.includes("hai") || text.includes("pagi") || text.includes("siang") || text.includes("malam")) {
    const list = airaResponses.greetings;
    return list[Math.floor(Math.random() * list.length)];
  } else if (text.includes("tugas") || text.includes("kuliah") || text.includes("coding") || text.includes("web") || text.includes("pr")) {
    const list = airaResponses.tasks;
    return list[Math.floor(Math.random() * list.length)];
  } else if (text.includes("capek") || text.includes("lelah") || text.includes("istirahat") || text.includes("ngantuk")) {
    const list = airaResponses.relax;
    return list[Math.floor(Math.random() * list.length)];
  } else {
    const list = airaResponses.defaultReplies;
    return list[Math.floor(Math.random() * list.length)];
  }
}

// Format waktu jam:menit
function getCurrentTimeString() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return hours + ":" + minutes;
}

// Render data ke tabel memori
function renderMemoryTable(data) {
  const tbody = document.getElementById("memory-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: #94a8b3; padding: 24px;">
          Tidak ada catatan memori yang sesuai dengan filter.
        </td>
      </tr>
    `;
    return;
  }

  data.forEach(function (item) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-id", item.id);

    let priorityBadge = "";
    if (item.priority === "Utama") {
      priorityBadge = `<span style="color: #38bdf8; font-weight: 600;">Utama</span>`;
    } else if (item.priority === "Penting") {
      priorityBadge = `<span style="color: #2dd4bf; font-weight: 500;">Penting</span>`;
    } else {
      priorityBadge = `<span style="color: #94a8b3;">Sedang</span>`;
    }

    tr.innerHTML = `
      <th scope="row">${item.id}</th>
      <td>${item.category}</td>
      <td>${item.fact}</td>
      <td>${priorityBadge}</td>
      <td>
        <button type="button" class="btn-delete-memory" data-id="${item.id}" style="background: none; border: none; color: #f43f5e; cursor: pointer; text-decoration: underline; font-size: 0.85rem;">
          Hapus
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// Update teks ringkasan statistik
function updateMemoryStatsDisplay() {
  const statsContainer = document.getElementById("memory-stats-summary");
  if (!statsContainer) return;

  const stats = calculateMemoryStats(airaMemories);
  statsContainer.innerHTML = `
    <strong>Total Memori:</strong> ${stats.total} item &bull; 
    <span style="color: #38bdf8;">${stats.utama} Utama</span> &bull; 
    <span style="color: #2dd4bf;">${stats.penting} Penting</span> &bull; 
    <span style="color: #94a8b3;">${stats.sedang} Sedang</span>
  `;
}

// BAGIAN 2: JQUERY
// Selektor ($), event listener (.on), & animasi UI (.slideToggle, .fadeIn, .animate)

// Inisialisasi jQuery saat dokumen siap
$(document).ready(function () {

  // Modul Memory Vault (settings.html)
  if ($("#memory-settings").length > 0) {
    renderMemoryTable(airaMemories);
    updateMemoryStatsDisplay();

    // Toggle form tambah memori
    $("#toggle-memory-form-btn").on("click", function (e) {
      e.preventDefault();
      $("#add-memory-form").slideToggle(300, function () {
        if ($(this).is(":visible")) {
          $("#toggle-memory-form-btn").text("✕ Tutup Form");
          $("#new-mem-text").focus();
        } else {
          $("#toggle-memory-form-btn").text("+ Tambah Catatan");
        }
      });
    });

    // Tombol batal form
    $("#cancel-memory-form-btn").on("click", function () {
      $("#add-memory-form").slideUp(250);
      $("#toggle-memory-form-btn").text("+ Tambah Catatan");
      $("#new-mem-text").removeClass("input-invalid");
      $("#new-mem-error").hide();
    });

    // Hilangkan inline error saat textarea mulai diisi
    $("#new-mem-text").on("input", function () {
      if ($.trim($(this).val()) !== "") {
        $(this).removeClass("input-invalid");
        $("#new-mem-error").slideUp(120);
      }
    });

    // Filter kategori memori
    $("#filter-memory-category").on("change", function () {
      const selectedCategory = $(this).val();
      const filtered = filterMemoriesByCategory(airaMemories, selectedCategory);
      renderMemoryTable(filtered);
    });

    // Icon SVG toast
    const toastIcons = {
      success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
      delete: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`
    };

    let toastDismissTimeout = null;

    // Tutup toast dengan animasi slide-out
    function hideToast() {
      const toast = $("#memory-toast");
      const bar = $("#toast-progress-bar");

      clearTimeout(toastDismissTimeout);
      bar.stop();

      toast.removeClass("show").addClass("hiding");
      setTimeout(function () {
        toast.removeClass("hiding");
      }, 400);
    }

    // Tampilkan floating toast di pojok kanan atas
    function showToast(message, type, duration = 3800) {
      const toast = $("#memory-toast");
      const icon = $("#toast-icon");
      const text = $("#toast-message");
      const bar = $("#toast-progress-bar");

      clearTimeout(toastDismissTimeout);
      bar.stop();

      if (type === "delete") {
        icon.html(toastIcons.delete);
        bar.css("background", "#f43f5e");
        toast.css("border-color", "rgba(244, 63, 94, 0.45)");
      } else {
        icon.html(toastIcons.success);
        bar.css("background", "#38bdf8");
        toast.css("border-color", "rgba(56, 189, 248, 0.45)");
      }

      text.html(message);
      bar.css({ width: "100%" });

      toast.removeClass("hiding").addClass("show");

      bar.animate({ width: "0%" }, duration, "linear", function () {
        hideToast();
      });
    }

    // Tombol close toast
    $("#close-toast-btn").on("click", function () {
      hideToast();
    });

    // Submit form tambah catatan baru
    $("#add-memory-form").on("submit", function (e) {
      e.preventDefault();

      const category = $("#new-mem-cat").val();
      const priority = $("#new-mem-priority").val();
      const factText = $.trim($("#new-mem-text").val());

      // Validasi input kosong dengan inline error
      if (factText === "") {
        $("#new-mem-text").addClass("input-invalid");
        $("#new-mem-error").slideDown(150);
        $("#new-mem-text").focus();
        return;
      }
      $("#new-mem-text").removeClass("input-invalid");
      $("#new-mem-error").hide();

      // Buat id baru
      const nextIdNum = airaMemories.length + 1;
      const newId = "MEM-" + String(nextIdNum).padStart(2, "0");

      const newMemory = {
        id: newId,
        category: category,
        fact: factText,
        priority: priority,
        createdAt: getCurrentTimeString()
      };
      airaMemories.push(newMemory);

      // Render ulang tabel
      const currentFilter = $("#filter-memory-category").val();
      renderMemoryTable(filterMemoriesByCategory(airaMemories, currentFilter));
      updateMemoryStatsDisplay();

      $("#new-mem-text").val("");
      $("#add-memory-form").slideUp(250);
      $("#toggle-memory-form-btn").text("+ Tambah Catatan");

      showToast(`Catatan <strong>"${newId}"</strong> (${category}) berhasil disimpan ke ingatan AIRA.`, "success");
    });

    let activeDeleteId = null;

    // Buka modal konfirmasi hapus memori
    $("#memory-table-body").on("click", ".btn-delete-memory", function () {
      activeDeleteId = $(this).attr("data-id");
      $("#modal-mem-id").text(activeDeleteId);
      $("#delete-modal").fadeIn(200);
    });

    // Tutup modal saat klik batal
    $("#modal-cancel-btn").on("click", function () {
      $("#delete-modal").fadeOut(200);
      activeDeleteId = null;
    });

    // Tutup modal saat klik area luar dialog (backdrop)
    $("#delete-modal").on("click", function (e) {
      if ($(e.target).is("#delete-modal")) {
        $(this).fadeOut(200);
        activeDeleteId = null;
      }
    });

    // Konfirmasi hapus memori dari modal
    $("#modal-confirm-delete-btn").on("click", function () {
      if (!activeDeleteId) return;

      const memoryId = activeDeleteId;
      const row = $(`#memory-table-body tr[data-id="${memoryId}"]`);

      $("#delete-modal").fadeOut(200);

      row.fadeOut(350, function () {
        airaMemories = airaMemories.filter(function (item) {
          return item.id !== memoryId;
        });

        const currentFilter = $("#filter-memory-category").val();
        renderMemoryTable(filterMemoriesByCategory(airaMemories, currentFilter));
        updateMemoryStatsDisplay();

        showToast(`Catatan <strong>"${memoryId}"</strong> berhasil dihapus dari ingatan AIRA.`, "delete");
        activeDeleteId = null;
      });
    });
  }

  // Modul Chat Panggung (index.html)
  if ($(".chat-panel").length > 0) {
    const chatMessagesContainer = $("#chat-messages");
    const chatForm = $(".chat-form");
    const chatInput = $("#chat-text");
    const typingIndicator = $("#typing-indicator");

    // Scroll otomatis ke bawah
    function scrollChatToBottom() {
      chatMessagesContainer.animate({
        scrollTop: chatMessagesContainer[0].scrollHeight
      }, 300);
    }

    // Kirim pesan chat
    chatForm.on("submit", function (e) {
      e.preventDefault();

      const userText = $.trim(chatInput.val());

      // Validasi input kosong
      if (userText === "") {
        chatInput.addClass("input-error");
        setTimeout(function () {
          chatInput.removeClass("input-error");
        }, 500);
        return;
      }

      const currentTime = getCurrentTimeString();

      // Balon pesan user
      const userBubble = $(`
        <article class="message-bubble user-message" style="display: none;">
          <header class="message-header">
            <strong>Kamu</strong> &bull; <time datetime="${currentTime}">${currentTime}</time>
          </header>
          <p>${userText}</p>
        </article>
      `);

      chatMessagesContainer.append(userBubble);
      userBubble.fadeIn(300);
      chatInput.val("");
      scrollChatToBottom();

      // Animasi indikator mengetik
      typingIndicator.slideDown(200);
      scrollChatToBottom();

      // Balasan AIRA
      setTimeout(function () {
        typingIndicator.slideUp(150);

        const aiReplyText = generateCompanionReply(userText);
        const replyTime = getCurrentTimeString();

        const aiBubble = $(`
          <article class="message-bubble ai-message" style="display: none;">
            <header class="message-header">
              <img src="../public/images/hiyori-preview.png" alt="Foto profil AIRA" class="avatar-mini">
              <strong>AIRA</strong> &bull; <time datetime="${replyTime}">${replyTime}</time>
            </header>
            <p>${aiReplyText}</p>
          </article>
        `);

        chatMessagesContainer.append(aiBubble);
        aiBubble.fadeIn(350);
        scrollChatToBottom();
      }, 800);
    });

    // Shortcut enter untuk kirim pesan
    chatInput.on("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        chatForm.trigger("submit");
      }
    });
  }

  // Modul Masuk Akun (login.html)
  if ($(".login-form").length > 0) {
    const emailInput = $("#user-email");
    const passwordInput = $("#user-password");
    const emailError = $("#email-error");
    const passwordError = $("#password-error");

    // Hilangkan inline error saat email diisi
    emailInput.on("input", function () {
      if ($.trim($(this).val()) !== "") {
        $(this).removeClass("input-invalid");
        emailError.slideUp(120);
      }
    });

    // Hilangkan inline error saat password diisi
    passwordInput.on("input", function () {
      if ($.trim($(this).val()) !== "") {
        $(this).removeClass("input-invalid");
        passwordError.slideUp(120);
      }
    });

    // Validasi submit form login
    $(".login-form").on("submit", function (e) {
      let isValid = true;
      const emailVal = $.trim(emailInput.val());
      const passwordVal = $.trim(passwordInput.val());

      // Validasi email
      if (emailVal === "") {
        emailInput.addClass("input-invalid");
        emailError.text("Email wajib diisi.").slideDown(150);
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        emailInput.addClass("input-invalid");
        emailError.text("Format email tidak valid (contoh: nama@email.com).").slideDown(150);
        isValid = false;
      } else {
        emailInput.removeClass("input-invalid");
        emailError.hide();
      }

      // Validasi password
      if (passwordVal === "") {
        passwordInput.addClass("input-invalid");
        passwordError.text("Kata sandi wajib diisi.").slideDown(150);
        isValid = false;
      } else {
        passwordInput.removeClass("input-invalid");
        passwordError.hide();
      }

      // Cegah submit jika ada input tidak valid
      if (!isValid) {
        e.preventDefault();
        if (emailVal === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
          emailInput.focus();
        } else if (passwordVal === "") {
          passwordInput.focus();
        }
      }
    });
  }

});

// ضبط التاريخ الحالي عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', (event) => {
  const dateField = document.getElementById('date');
  const today = new Date().toLocaleDateString('ar-EG');
  dateField.value = today;
});

// دالة للحصول على الموقع الحالي
function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
      alert("Geolocation غير مدعومة في هذا المتصفح.");
  }
}

// عرض الموقع في حقل النص
function showPosition(position) {
  const locationField = document.getElementById('location');
  locationField.value = Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude};
}

// التعامل مع أخطاء الموقع
function showError(error) {
  switch(error.code) {
      case error.PERMISSION_DENIED:
          alert("تم رفض طلب الموقع.");
          break;
      case error.POSITION_UNAVAILABLE:
          alert("الموقع غير متاح.");
          break;
      case error.TIMEOUT:
          alert("طلب الموقع انتهى الوقت المخصص له.");
          break;
      case error.UNKNOWN_ERROR:
          alert("خطأ غير معروف.");
          break;
  }
}

// التعامل مع إرسال النموذج
document.getElementById('attendance-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  
  fetch('http://app.thefutureshield.com/api/attendance', {
      method: 'POST',
      body: formData,
      headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6InZOUHpqcENQRWJXNzI2U1c1VkkxIiwiY29tcGFueV9pZCI6IlZyOTZvOWlZaEJrUFdFbk45ZVBrIiwidmVyc2lvbiI6MSwiaWF0IjoxNjg4ODk4MDAyNDIxLCJzdWIiOiJ1c2VyX2lkIn0.UL1ReyZ0OuB95gedzVMDLF1UIC4WY_tMCJSmhMfjvug'
      }
  })
  .then(response => response.json())
  .then(data => {
      alert('تم تسجيل الحضور بنجاح!');
  })
  .catch(error => {
      console.error('Error:', error);
  });
});